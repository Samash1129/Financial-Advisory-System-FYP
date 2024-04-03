// controllers/summaryController.js
const axios = require('axios')

const pythonRunner = require('../Models/PythonRunner');

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
    // consolse.log(response.data)
  } catch (err) {
    console.error(err)
  }
}