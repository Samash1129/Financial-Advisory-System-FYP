<<<<<<< HEAD
// controllers/summaryController.js
=======
>>>>>>> AliMashoud
const axios = require('axios')

const pythonRunner = require('../Models/PythonRunner');

<<<<<<< HEAD
exports.getSummary = async (req, res) => {
  try {
    const result = await pythonRunner.runPythonScript('summary.py', []);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.sentimentAnalysis = async(req, res) => {
  try {
    const response = axios.get('http://13.229.231.220:8000/analyze-sentiment')

    res.json(response.data);
=======

const ip = "0.0.0.0:5020"

exports.fetchNewsController= async(req, res) => {
  try {
      const response = await axios.get(`http://${ip}/fetch-news`);
      //const response = await axios.get('http://0.0.0.0:5020/fetch-news');
      return res.status(response.status).json(response.data);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status_code: 500, content: 'Something went wrong' });
  }
};

exports.sentimentAnalysis = async(req, res) => {
  try {
    const response = await axios.get(`http://${ip}/analyze-sentiment`)
    //const response = await axios.get('http://0.0.0.0:5020/analyze-sentiment');

    return res.status(response.status).json(response.data);
    // consolse.log(response.data)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ status_code: 500, content: 'Something went wrong' });
  }

};
exports.sentimentAnalysisVader = async(req, res) => {
  try {
    const response = await axios.get(`http://${ip}/analyze-sentiment-vader`)
    //const response = await axios.get('http://0.0.0.0:5020/analyze-sentiment-vader');
    return res.status(response.status).json(response.data);
>>>>>>> AliMashoud
    // consolse.log(response.data)
  } catch (err) {
    console.error(err)
  }
<<<<<<< HEAD
}
=======
};


exports.generateSummaries = async(req, res) => {
  try {
    const response = await axios.get(`http://${ip}/generate-summary`)
    //const response = await axios.get('http://0.0.0.0:5020/generate-summary');
    console.log(response.status)
    return res.status(response.status).json(response.data);
    // consolse.log(response.data)
  } catch (err) {
    console.error(err)
  }
};

exports.elevychat = async (req, res) => {
  try {
    const { user_input, conversation_id, ticker } = req.body; // Assuming parameters are coming from the request body
    
    // Check if required parameters are present
    if (!user_input || (!conversation_id && !ticker)) {
      return res.status(400).json({ error: "Either 'user_input' or 'conversation_id'/'ticker' must be provided." });
    }

    console.log(user_input)
    console.log(conversation_id)
    console.log(ticker)

    
    const response = await axios.post(`http://${ip}/start-conversation`, {
      user_input: user_input,
      conversation_id: conversation_id,
      ticker: ticker
    });

    return res.status(response.status).json(response.data);
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.generateFundamentals = async(req, res) => {
  try {
    const response = await axios.get(`http://${ip}/generate-fundamentals`)
    //const response = await axios.get('http://0.0.0.0:5020/generate-fundamentals');
    console.log(response.status)
    return res.status(response.status).json(response.data);
    // consolse.log(response.data)
  } catch (err) {
    console.error(err)
  }
}
>>>>>>> AliMashoud
