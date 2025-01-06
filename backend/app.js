// Import and create an express app
const express = require("express");
const app = express();

// Import mysql
const mysql = require("mysql2");

// Define the connection
const dbConfig = mysql.createConnection({
  host: "localhost",
  user: "demoapp",
  password: "demoapp",
  database: "demoapp",
  connectionLimit: 10,
});

// Connect to the database
dbConfig.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// set up the port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// middleware
// app.use(cors());
// app.use(express.json());
