const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    investmentGoals: {
      type: String
    },
    riskTolerance: {
      type: String
    },
    amountToInvest: {
      type: Number
    },
    preferredIndustries: [{
      type: String
    }],
    stockType: {
      type: String
    }
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
