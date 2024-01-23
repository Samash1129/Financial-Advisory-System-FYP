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
    required : true,
  },
  role: {
    type: String,
    enum: ['Admin', 'SuperAdmin', 'User'],
    default: 'User',
  },
  preference: {
    riskTolerance: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    investmentFrequency: {
      type: Number,
      min: 1,
      max: 365,
      },
    amountToInvest: {
      type: Number,
      min: 0,
    },
    preferredIndustry:{
      type:String,
      enum: ['Information Technology', 'Banking', 'Automobile', 'Textile'],
    },
    investmentPriority:{
      type: String,
      enum: ['Dividend', 'Capital-Growth', 'Export Industries']
    }

  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
