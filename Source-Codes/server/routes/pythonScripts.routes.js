const express = require("express");
const router = express.Router();
const {
  checkPython,
  getStocksWithPrices,
  sentimentAnalysis,
  fetchNewsController,
  sentimentAnalysisVader,
  generateSummaries,
  elevychat,
  fetchChatHistory,
  generateFundamentals,
  generateRecommendations,
  getCloseVals,
  getFundVals
} = require("../Controllers/pythonScripts.controller");

router.route("/check-python").get(checkPython);
router.route("/get-stocks").post(getStocksWithPrices);
router.route("/sentiment-analysis").get(sentimentAnalysis);
router.route("/fetch-news").get(fetchNewsController);
router.route("/sentiment-analysis-vader").get(sentimentAnalysisVader);
router.route("/summarize").get(generateSummaries);
router.route("/elevychat").post(elevychat);
router.route("/getChatHistory").post(fetchChatHistory);
router.route("/generatefundamentals").get(generateFundamentals);
router.route("/generaterecommendations").post(generateRecommendations);
router.route("/getclosevals").post(getCloseVals)
router.route("/getfundvals").post(getFundVals)

module.exports = router;
