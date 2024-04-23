// models/pythonRunner.js

<<<<<<< HEAD
const { PythonShell } = require('python-shell');
=======
const { PythonShell } = require("python-shell");
>>>>>>> AliMashoud

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
