const axios = require("axios");

const pythonRunner = require("../Models/PythonRunner");

// const ip = "0.0.0.0:5020"
const ip = "127.0.0.1:8000";

exports.fetchNewsController = async (req, res) => {
  try {
    const response = await axios.get(`http://${ip}/fetch-news`);
    //const response = await axios.get('http://0.0.0.0:5020/fetch-news');
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status_code: 500, content: "Something went wrong" });
  }
};

exports.sentimentAnalysis = async (req, res) => {
  try {
    const response = await axios.get(`http://${ip}/analyze-sentiment`);
    //const response = await axios.get('http://0.0.0.0:5020/analyze-sentiment');

    return res.status(response.status).json(response.data);
    // consolse.log(response.data)
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status_code: 500, content: "Something went wrong" });
  }
};
exports.sentimentAnalysisVader = async (req, res) => {
  try {
    const response = await axios.get(`http://${ip}/analyze-sentiment-vader`);
    //const response = await axios.get('http://0.0.0.0:5020/analyze-sentiment-vader');
    return res.status(response.status).json(response.data);
    // consolse.log(response.data)
  } catch (err) {
    console.error(err);
  }
};

exports.generateSummaries = async (req, res) => {
  try {
    const response = await axios.get(`http://${ip}/generate-summary`);
    //const response = await axios.get('http://0.0.0.0:5020/generate-summary');
    console.log(response.status);
    return res.status(response.status).json(response.data);
    // consolse.log(response.data)
  } catch (err) {
    console.error(err);
  }
};

exports.elevychat = async (req, res) => {
  try {
    const { user_input, conversation_id, ticker } = req.body; // Assuming parameters are coming from the request body

    // Check if required parameters are present
    if (!user_input || (!conversation_id && !ticker)) {
      return res
        .status(400)
        .json({
          error:
            "Either 'user_input' or 'conversation_id'/'ticker' must be provided.",
        });
    }

    console.log(user_input);
    console.log(conversation_id);
    console.log(ticker);

    const response = await axios.post(`http://${ip}/start-conversation`, {
      user_input: user_input,
      conversation_id: conversation_id,
      ticker: ticker,
    });

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.generateFundamentals = async (req, res) => {
  try {
    const response = await axios.get(`http://${ip}/generate-fundamentals`);
    //const response = await axios.get('http://0.0.0.0:5020/generate-fundamentals');
    console.log(response.status);
    return res.status(response.status).json(response.data);
    // consolse.log(response.data)
  } catch (err) {
    console.error(err);
  }
};

exports.fetchChatHistory = async (req, res) => {
  const { conversation_id } = req.body;

  try {
    const response = await axios.get(`http://${ip}/load-conversation`, {
      conversation_id: conversation_id,
    });
    //const response = await axios.get('http://0.0.0.0:5020/load-conversation');
    console.log(response.status);
    return res.status(response.status).json(response.data);
    // consolse.log(response.data)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error(err);
  }
};