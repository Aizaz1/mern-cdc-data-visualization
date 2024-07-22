const mongoose = require('mongoose');

const VaccinationDataSchema = new mongoose.Schema({
  row_id: String,
  data_id: String,
  national_or_jurisdictional: String,
  jurisdiction: String,
  population_group: String,
  measure_type: String,
  measure_category: String,
  measure_value: String,
  date_range: String,
  year: String,
  frequency: String,
  value: Number,
  confidence_interval: String,
  sample_size: String,
  missing_data: String,
});

module.exports = mongoose.model('VaccinationData', VaccinationDataSchema);
