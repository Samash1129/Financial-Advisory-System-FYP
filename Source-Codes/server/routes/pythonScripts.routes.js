const express = require("express");
const router = express.Router();
const {
  checkPython,
  sentimentAnalysis,
  fetchNewsController,
  sentimentAnalysisVader,
  generateSummaries,
  elevychat,
  fetchChatHistory,
  generateFundamentals,
} = require("../Controllers/pythonScripts.controller");

router.route("/check-python").get(checkPython);
router.route("/sentiment-analysis").get(sentimentAnalysis);
router.route("/fetch-news").get(fetchNewsController);
router.route("/sentiment-analysis-vader").get(sentimentAnalysisVader);
router.route("/summarize").get(generateSummaries);
router.route("/elevychat").post(elevychat);
router.route("/getChatHistory").post(fetchChatHistory);
router.route("/generatefundamentals").get(generateFundamentals);

module.exports = router;
