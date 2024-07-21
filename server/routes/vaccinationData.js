// server/routes/vaccinationData.js
const express = require('express');
const router = express.Router();
const VaccinationData = require('../models/VaccinationData');

router.get('/api/vaccination-data', async (req, res) => {
  try {
    const filters = req.query;
    const data = await VaccinationData.find(filters);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
