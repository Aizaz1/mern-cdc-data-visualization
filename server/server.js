const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config();
const cron = require('node-cron');
const fetchData = require('./scripts/fetchData'); // Import the fetchData function

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
}));

app.use(express.json());
app.use('/api', apiRoutes);

// Schedule tasks to be run on the server
cron.schedule('0 0 * * *', async () => {
  console.log('Running a job at midnight every day');
  try {
    await fetchData();
    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

    
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
