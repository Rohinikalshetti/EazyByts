const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace with your DB username
    password: "", // Replace with your DB password
    database: "portfolio_db", // Replace with your DB name
});

// Define the /api/contact POST route
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("All fields are required.");
    }

    const query = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Error saving the message.");
        }
        res.status(200).send("Message saved successfully.");
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


