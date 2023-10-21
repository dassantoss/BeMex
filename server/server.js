const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'bemexuser',
  password: '9001',
  database: 'bemexdb',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define your API endpoints here

app.get('/', (req, res) => {
  res.send('Hello from your server!');
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
