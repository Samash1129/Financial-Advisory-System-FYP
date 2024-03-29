// routes/summaryRoutes.js

const express = require('express');
const router = express.Router();
const summaryController = require('../Controllers/pythonController');

router.get('/summary', summaryController.getSummary);

module.exports = router;
