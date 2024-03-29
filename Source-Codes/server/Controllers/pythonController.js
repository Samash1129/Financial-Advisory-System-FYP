// controllers/summaryController.js

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
