// server.js

require('dotenv').config(); // Load environment variables
const express = require('express'); // Importing Express framework
const morgan = require('morgan'); // Importing Morgan for HTTP request logging
const cors = require('cors');

const pool = require('./models/database'); // Import the database pool
const requirementRoutes = require('./routes/requirementRoutes'); // Import requirement routes
const studyRoutes = require('./routes/studyRoutes'); // Import study routes
const examRoutes = require('./routes/examRoutes'); // Import exam routes

/**
 * Configures and starts an Express server.
 */
const app = express(); // Creating an instance of Express
const port = process.env.PORT || 5000; // Setting the server port from environment variables or default to 5000

// Middlewares
app.use(morgan('dev')); // Morgan middleware for logging HTTP requests
app.use(express.json()); // Middleware to parse JSON bodies

// Test database connection on start-up
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release(); // Release the database connection back to the pool
});

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE',
};

app.use(cors(corsOptions));

// Routes
app.use('/api', requirementRoutes); // Use requirement routes with '/api' prefix
app.use('/api', studyRoutes); // Use study routes with '/api' prefix
app.use('/api', examRoutes); // Use exam routes with '/api' prefix

// Basic route for the homepage
app.get('/', (req, res) => {
  res.send('Hello from your server!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle server shutdown and cleanup
process.on('SIGINT', () => {
  pool.end(err => {
    if (err) console.error('Error closing the connection pool', err);
    process.exit(err ? 1 : 0);
  });
});
