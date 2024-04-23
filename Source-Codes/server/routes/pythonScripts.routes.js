const express = require("express");
const router = express.Router();
const pythonScriptsController = require("../Controllers/pythonScripts.controller");
const {
  sentimentAnalysis,
  fetchNewsController,
  sentimentAnalysisVader,
  generateSummaries,
  elevychat,
  generateFundamentals,
} = require("../Controllers/pythonScripts.controller");

router.route("/sentiment-analysis").get(sentimentAnalysis);
router.route("/fetch-news").get(fetchNewsController);
router.route("/sentiment-analysis-vader").get(sentimentAnalysisVader);
router.route("/summarize").get(generateSummaries);
router.route("/elevychat").post(elevychat);
router.route("/generatefundamentals").get(generateFundamentals);

module.exports = router;
