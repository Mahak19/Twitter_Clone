const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config');
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

module.exports = (req, res, next)=>{
    // Extract the authorization header from the request
    const {authorization} = req.headers;
    // Check if authorization header is missing
    if(!authorization){
        // Return 401 Unauthorized if authorization header is missing
        return res.status(401).json({error: "User not logged in"});
    }
    // Extract the token from the authorization header
    const token = authorization.replace("Bearer ", "");
    // Verify the JWT token
    jwt.verify(token, JWT_SECRET, (error, payload)=>{
        // If verification fails, return 401 Unauthorized
        if(error){
            return res.status(401).json({error: "User not logged in"});
        }
        // Extract user ID from the JWT payload
        const {_id} = payload;
        // Find user in the database by ID
        UserModel.findById(_id)
        .then((dbUser)=>{
            // Set the user object in the request
            req.user = dbUser;
            // Call next middleware or route handler
            next();
        })
    });
}
