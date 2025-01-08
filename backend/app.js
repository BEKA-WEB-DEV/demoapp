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

// middleware

app.use(express.json());
// app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/add-employee", (req, res) => {
  console.log(req.body);
  // write the query to add the data to the database named employee_test
  const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
  // execute the query
  dbConfig.query(
    sql,
    [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
    ],
    (err, result) => {
      if (err) throw err;
      console.log("Data added to the database");
    }
  );
  const response = {
    status: "success",
    message: "Employee added successfully",
  };
  res.status(200).send(response);
});

//post request handler for login an employee which comes to this route /login and after that we will check the email and password in the database and if it is correct then we will send the response as success and if it is not correct then we will send the response as failed.
app.post("/login", (req, res) => {
  console.log(req.body);
  const sql = `SELECT * FROM employee_test WHERE email = ? AND password = ?`;
  dbConfig.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const response = {
        status: "success",
        message: "Login successful",
      };
      res.status(200).send(response);
    } else {
      const response = {
        status: "failed",
        message: "Login failed",
      };
      res.status(200).send(response);
    }
  });
});

// set up the port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
