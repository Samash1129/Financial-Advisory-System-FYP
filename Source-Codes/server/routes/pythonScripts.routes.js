// routes/summaryRoutes.js

const express = require('express');
const router = express.Router();
const summaryController = require('../Controllers/pythonScripts.controller');
const { sentimentAnalysis } = require('../Controllers/pythonScripts.controller');

router.get('/summary', summaryController.getSummary);

router.route("/sentiment-analysis").get(sentimentAnalysis)

module.exports = router;
