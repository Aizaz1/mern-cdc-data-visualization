const mongoose = require('mongoose');

const vaccinationDataSchema = new mongoose.Schema({
  jurisdiction: String,
  vaccination_status: String,
  intent: String,
  demographics: {
    age: String,
    gender: String,
    race: String
  },
  date: Date
});

module.exports = mongoose.model('VaccinationData', vaccinationDataSchema);
