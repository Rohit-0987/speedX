const express = require('express');
const { analyzePerformance } = require('../controllers/performanceController');

const router = express.Router();

router.post('/analyze', analyzePerformance);

module.exports = router;
