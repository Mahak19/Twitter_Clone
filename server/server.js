// Import the express library
const express = require('express');
// Create an instance of the express application
const app = express();
// Import the CORS middleware for handling Cross-Origin Resource Sharing
const cors = require('cors');
// Import the mongoose library for MongoDB connection
const mongoose = require('mongoose');
// Import the MongoDB URL from the config file
const { MONGODB_URL } = require('./config')

// Set global variable for base directory
global.__basedir = __dirname;
// Connect to MongoDB using the provided URL
mongoose.connect(MONGODB_URL);

// Event listener for successful database connection
mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
// Event listener for database connection errors
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

// Middleware to enable CORS
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes for user-related endpoints
app.use(require('./routes/user_route'));
// Routes for file-related endpoints
app.use(require('./routes/file_route'));

// Define the port number for the server to listen on
const PORT = 4000;
// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log("Server started");
});
