const express = require('express');
const router = express.Router();
const VaccinationData = require('../models/VaccinationData');

// Get all data
router.get('/vaccination-data', async (req, res) => {
  try {
    const filters = {};
    if (req.query.national_or_jurisdictional) filters.national_or_jurisdictional = req.query.national_or_jurisdictional;
    if (req.query.jurisdiction) filters.jurisdiction = req.query.jurisdiction;
    if (req.query.population_group) filters.population_group = req.query.population_group;
    if (req.query.measure_type) filters.measure_type = req.query.measure_type;
    if (req.query.measure_category) filters.measure_category = req.query.measure_category;

    const data = await VaccinationData.find(filters);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
