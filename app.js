const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const express = require('express'); // Web framework for Node.js
const cors = require('cors'); // Middleware for enabling CORS (Cross-Origin Resource Sharing)
const app = express(); // Create an instance of the Express application

const userApi = require('./api/userApi.js'); // Import user-related API routes

// Parse application/x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json data
app.use(bodyParser.json());

app.use(cors()); // Enable CORS for all routes

// Set up CORS headers for all routes
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use("/api/user", userApi); // Use userApi for routes under /api/user

app.listen(10520); // Start server on port 10520
console.log("success"); // Log "success" when the server starts

