const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const User = mongoose.model("User");
const User = require('../models/user_model'); // Assuming the User schema is in a 'models' folder
const Tweet = require('../models/tweet_model'); // Assuming the Tweet schema is in a 'models' folder

const app = express();

// Connect to MongoDB (replace 'your_mongodb_uri' with your actual MongoDB URI)
mongoose.connect('mongodb://127.0.0.1/Twitter', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON requests
app.use(express.json());

// Multer configuration for handling file uploads (if needed)
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

// Route to create a tweet
app.post('/api/tweets', async (req, res) => {
    const { content, tweetedBy, image } = req.body;

    try {
        // Create a new tweet
        const tweet = new Tweet({
            content,
            tweetedBy,
            image,
        });

        // Save the tweet
        const savedTweet = await tweet.save();

        // Return success response
        res.status(201).json({
            success: true,
            tweet: savedTweet,
        });
    } catch (error) {
        // Handle database or other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// Route to like a tweet
app.post('/api/tweets/:tweetId/like', async (req, res) => {
    const userId = req.body.userId; // Assuming you send the user's ID in the request body
    const tweetId = req.params.tweetId;

    try {
        // Find the user and the tweet
        const user = await User.findById(userId);
        const tweet = await Tweet.findById(tweetId);

        if (user && tweet) {
            // Check if the user has already liked the tweet
            if (!tweet.likes.includes(userId)) {
                // Update the likes array in the tweet
                tweet.likes.push(userId);

                // Save the updated tweet
                await tweet.save();

                // Return success response
                res.status(200).json({
                    success: true,
                    message: 'Tweet liked successfully',
                });
            } else {
                // User has already liked the tweet
                res.status(400).json({
                    success: false,
                    message: 'Tweet already liked by the user',
                });
            }
        } else {
            // User or tweet not found
            res.status(404).json({
                success: false,
                message: 'User or tweet not found',
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

// Route to dislike a tweet (remove like)
app.post('/api/tweets/:tweetId/dislike', async (req, res) => {
    const userId = req.body.userId; // Assuming you send the user's ID in the request body
    const tweetId = req.params.tweetId;

    try {
        // Find the user and the tweet
        const user = await User.findById(userId);
        const tweet = await Tweet.findById(tweetId);

        if (user && tweet) {
            // Check if the user has liked the tweet
            const likeIndex = tweet.likes.indexOf(userId);
            if (likeIndex !== -1) {
                // Remove the user's ID from the likes array in the tweet
                tweet.likes.splice(likeIndex, 1);

                // Save the updated tweet
                await tweet.save();

                // Return success response
                res.status(200).json({
                    success: true,
                    message: 'Tweet disliked successfully',
                });
            } else {
                // User has not liked the tweet
                res.status(400).json({
                    success: false,
                    message: 'Tweet is not liked by the user',
                });
            }
        } else {
            // User or tweet not found
            res.status(404).json({
                success: false,
                message: 'User or tweet not found',
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

// Route to reply to a tweet
app.post('/api/tweets/:tweetId/reply', async (req, res) => {
    const { content, repliedBy } = req.body;
    const tweetId = req.params.tweetId;

    try {
        // Find the tweet
        const tweet = await Tweet.findById(tweetId);

        if (tweet) {
            // Create a new tweet for the reply
            const replyTweet = new Tweet({
                content,
                tweetedBy: repliedBy,
            });

            // Save the reply tweet
            const savedReplyTweet = await replyTweet.save();

            // Update the original tweet with the reply
            tweet.replies.push(savedReplyTweet._id);
            await tweet.save();

            // Return success response
            res.status(201).json({
                success: true,
                message: 'Tweet replied successfully',
                replyTweet: savedReplyTweet,
            });
        } else {
            // Tweet not found
            res.status(404).json({
                success: false,
                message: 'Tweet not found',
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

// Route to get details of a single tweet
app.get('/api/tweets/:tweetId', async (req, res) => {
    const tweetId = req.params.tweetId;

    try {
        // Find the tweet
        const tweet = await Tweet.findById(tweetId)
            .populate('tweetedBy', 'name username profilePicture') // Populate user data in tweetedBy
            .populate('likes', 'name username profilePicture') // Populate user data in likes
            .populate({
                path: 'retweetBy.user',
                model: 'User',
                select: 'name username profilePicture',
            }) // Populate user data in retweets
            .populate('replies', '-replies') // Exclude replies of replies
            .exec();

        if (tweet) {
            // Return tweet details in the response
            res.status(200).json({
                success: true,
                tweet: tweet,
            });
        } else {
            // Tweet not found
            res.status(404).json({
                success: false,
                message: 'Tweet not found',
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

// Route to get details of all tweets
app.get('/api/tweets', async (req, res) => {
    try {
        // Find all tweets
        const tweets = await Tweet.find()
            .populate('tweetedBy', 'name username profilePicture') // Populate user data in tweetedBy
            .populate('likes', 'name username profilePicture') // Populate user data in likes
            .populate({
                path: 'retweetBy.user',
                model: 'User',
                select: 'name username profilePicture',
            }) // Populate user data in retweets
            .populate('replies', '-replies') // Exclude replies of replies
            .exec();

        // Return tweet details in the response
        res.status(200).json({
            success: true,
            tweets: tweets,
        });
    } catch (error) {
        // Handle database or other errors
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// Route to delete a tweet
app.delete('/api/tweets/:tweetId', async (req, res) => {
    const tweetId = req.params.tweetId;

    try {
        // Find the tweet
        const tweet = await Tweet.findById(tweetId);

        if (tweet) {
            // Check if the user is allowed to delete the tweet (you may customize this logic)
            // For example, you might want to check if the user deleting the tweet is the original poster

            // Delete the tweet
            await tweet.remove();

            // Return success response
            res.status(200).json({
                success: true,
                message: 'Tweet deleted successfully',
            });
        } else {
            // Tweet not found
            res.status(404).json({
                success: false,
                message: 'Tweet not found',
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

// Route to retweet a tweet
app.post('/api/tweets/:tweetId/retweet', async (req, res) => {
    const userId = req.body.userId; // Assuming you send the user's ID in the request body
    const tweetId = req.params.tweetId;

    try {
        // Find the user and the tweet
        const user = await User.findById(userId);
        const tweet = await Tweet.findById(tweetId);

        if (user && tweet) {
            // Check if the user has already retweeted the tweet
            const existingRetweet = tweet.retweetBy.find(retweet => retweet.user.toString() === userId.toString());

            if (!existingRetweet) {
                // Create a new retweet entry
                tweet.retweetBy.push({ user: userId });

                // Save the updated tweet
                await tweet.save();

                // Return success response
                res.status(200).json({
                    success: true,
                    message: 'Tweet retweeted successfully',
                });
            } else {
                // User has already retweeted the tweet
                res.status(400).json({
                    success: false,
                    message: 'Tweet already retweeted by the user',
                });
            }
        } else {
            // User or tweet not found
            res.status(404).json({
                success: false,
                message: 'User or tweet not found',
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

