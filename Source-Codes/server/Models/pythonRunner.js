// models/pythonRunner.js

const { PythonShell } = require('python-shell');

module.exports = {
  runPythonScript: async (scriptPath, args) => {
    return new Promise((resolve, reject) => {
      PythonShell.run(scriptPath, { args }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};
