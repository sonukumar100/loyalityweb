const express = require('express');
const compression = require('compression');
const path = require('path');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;

// Enable compression
app.use(compression());

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Enable Gzip compression for responses
app.use(compression());

// Set caching headers for static files
app.use(
  express.static(path.join(__dirname, 'build'), {
    maxAge: '1d', // Cache files for 1 day
    etag: false, // Disable ETag headers
  }),
);

// Enable HTTP/2 server push for static files
app.get('*', (req, res, next) => {
  res.set(
    'Link',
    '</static/css/main.css>; rel=preload; as=style, </static/js/main.js>; rel=preload; as=script',
  );
  next();
});

// Use a production-ready server like 'http' or 'https' instead of 'express'
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
