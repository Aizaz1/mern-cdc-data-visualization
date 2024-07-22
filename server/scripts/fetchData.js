const axios = require('axios');
const mongoose = require('mongoose');
const VaccinationData = require('../models/VaccinationData');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const CDC_API_URL = 'https://data.cdc.gov/api/views/qz99-wyhv/rows.json?accessType=DOWNLOAD';

const parseToNumber = (value) => {
  const number = parseFloat(value);
  return isNaN(number) ? null : number;
};

const validateData = (data) => {
  return data.filter(item => item[8] && item[9] && !isNaN(item[17]));
};

const transformData = (data) => {
  return data.map(item => ({
    row_id: item[0] || null,
    data_id: item[1] || null,
    national_or_jurisdictional: item[8] || null,
    jurisdiction: item[9] || null,
    population_group: item[10] || null,
    measure_type: item[11] || null,
    measure_category: item[12] || null,
    measure_value: item[13] || null,
    date_range: item[14] || null,
    year: item[15] || null,
    frequency: item[16] || null,
    value: parseToNumber(item[17]),
    confidence_interval: item[18] || null,
    sample_size: parseToNumber(item[19]),
    missing_data: item[20] || null,
  }));
};

const fetchData = async () => {
  try {
    const response = await axios.get(CDC_API_URL);
    const rawData = response.data.data;
    const validatedData = validateData(rawData);
    const transformedData = transformData(validatedData);

    await VaccinationData.deleteMany({});
    await VaccinationData.insertMany(transformedData);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error fetching or inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
};

fetchData();
