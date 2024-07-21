const axios = require('axios');
const mongoose = require('mongoose');
const VaccinationData = require('../models/VaccinationData');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchData() {
  try {
    const response = await axios.get('https://data.cdc.gov/api/views/qz99-wyhv/rows.json?accessType=DOWNLOAD');
    const data = response.data.data;

    for (const item of data) {
      // Transform and validate the data
      const newData = new VaccinationData({
        jurisdiction: item[8], // Adjust based on the actual data structure
        vaccination_status: item[9],
        intent: item[10],
        demographics: {
          age: item[11],
          gender: item[12],
          race: item[13]
        },
        date: new Date(item[14])
      });
      await newData.save();
    }
    console.log('Data fetched and saved successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    mongoose.connection.close();
  }
}

fetchData();
