const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs')
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const app = express();
const UserModel = mongoose.model("UserModel");
const { JWT_SECRET, MONGODB_URL} = require('../config');
const protectedResource = require('../middleware/protectedResource');
const User = require('../models/user_model')    


// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Upload destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

//POST API for registration
router.post("/auth/register", async(req, res) => {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
        return res.status(400).json({ error: "One or more fields are empty" })
    }
    User.findOne({ email: email, username: username })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "User with this email or username is already registered" });
            }
            bcryptjs.hash(password, 15)
                .then((hashedPassword) => {
                    const user = new User({ name, email, password: hashedPassword, username });
                    user.save()
                        .then((newUser) => {
                            return res.status(201).json({ result: "User Registration successful!!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }).catch((err) => {
                    console.log(err);
                })
        }).catch((err) => {
            console.log(err);
        })
})

//POST API for login
router.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    if (!password || !username) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    UserModel.findOne({ username: username })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "_id": userInDB._id, "username": userInDB.username };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

// Route to get a single user by ID
app.get('/api/user/:id', async (req, res) => {
    const userId = req.params._id;

    try {
        // Find user by ID
        const user = await User.findById(userId);

        if (user) {
            // Return user details in the response
            res.status(200).json({
                success: true,
                user: user,
            });
        } else {
            // User not found
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    } catch (error) {
        // Handle database or other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});         

// Route to follow a user
app.post('/api/user/:id/follow', async (req, res) => {
    const loggedInUserId = req.body.loggedInUserId; // Assuming you send the logged-in user's ID in the request body
    const userToFollowId = req.params.id;

    try {
        // Find the logged-in user and the user to follow
        const loggedInUser = await User.findById(loggedInUserId);
        const userToFollow = await User.findById(userToFollowId);

        if (loggedInUser && userToFollow) {
            // Check if the logged-in user is not already following the user
            if (!loggedInUser.following.includes(userToFollowId)) {
                // Update following and followers arrays
                loggedInUser.following.push(userToFollowId);
                userToFollow.followers.push(loggedInUserId);

                // Increment following and follower counts
                loggedInUser.followingCount += 1;
                userToFollow.followerCount += 1;

                // Save/update user data
                await loggedInUser.save();
                await userToFollow.save();

                // Return success response
                res.status(200).json({
                    success: true,
                    message: 'User followed successfully',
                });
            } else {
                // User is already being followed
                res.status(400).json({
                    success: false,
                    message: 'User is already being followed',
                });
            }
        } else {
            // User or user to follow not found
            res.status(404).json({
                success: false,
                message: 'User or user to follow not found',
            });
        }
    } catch (error) {
        // Handle database or other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// Route to unfollow a user
app.post('/api/user/:id/unfollow', async (req, res) => {
    const loggedInUserId = req.body.loggedInUserId; // Assuming you send the logged-in user's ID in the request body
    const userToUnfollowId = req.params.id;

    try {
        // Find the logged-in user and the user to unfollow
        const loggedInUser = await User.findById(loggedInUserId);
        const userToUnfollow = await User.findById(userToUnfollowId);

        if (loggedInUser && userToUnfollow) {
            // Check if the logged-in user is following the user to unfollow
            if (loggedInUser.following.includes(userToUnfollowId)) {
                // Update following and followers arrays
                loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userToUnfollowId.toString());
                userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== loggedInUserId.toString());

                // Decrement following and follower counts
                loggedInUser.followingCount -= 1;
                userToUnfollow.followerCount -= 1;

                // Save/update user data
                await loggedInUser.save();
                await userToUnfollow.save();

                // Return success response
                res.status(200).json({
                    success: true,
                    message: 'User unfollowed successfully',
                });
            } else {
                // User is not being followed
                res.status(400).json({
                    success: false,
                    message: 'User is not being followed',
                });
            }
        } else {
            // User or user to unfollow not found
            res.status(404).json({
                success: false,
                message: 'User or user to unfollow not found',
            });
        }
    } catch (error) {
        // Handle database or other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// Route to edit user details
app.put('/api/user/:id/edit', async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body; // Assuming you send the updated user data in the request body

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (user) {
            // Update user details
            user.name = updatedUserData.name || user.name;
            user.username = updatedUserData.username || user.username;
            user.email = updatedUserData.email || user.email;
            user.password = updatedUserData.password || user.password; // Ensure to hash/encrypt the password before saving
            user.profilePicture = updatedUserData.profilePicture || user.profilePicture;
            user.location = updatedUserData.location || user.location;
            user.dateOfBirth = updatedUserData.dateOfBirth || user.dateOfBirth;

            // Save/update user data
            await user.save();

            // Return success response
            res.status(200).json({
                success: true,
                message: 'User details updated successfully',
                user: user,
            });
        } else {
            // User not found
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    } catch (error) {
        // Handle database or other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// Route to upload a user's profile picture
app.post('/api/user/:id/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
    const userId = req.params.id;
    const profilePicturePath = req.file.path;

    try {
        // Find the user
        const user = await User.findById(userId);

        if (user) {
            // Update the user's profile picture
            user.profilePicture = profilePicturePath;
            await user.save();

            // Return success response
            res.status(200).json({
                success: true,
                message: 'Profile picture uploaded successfully',
            });
        } else {
            // User not found
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    } catch (error) {
        // Handle database or other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
module.exports = router;