const express = require('express');
const cors = require('cors');
const router = require('./api/route');

const app = express();
const PORT = 5556;

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api', router);

// 404 Error Handler
app.use((req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
