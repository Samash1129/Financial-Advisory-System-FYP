const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Centralized error handling middleware
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};


// Controller for user sign-up
exports.signUp = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { name, password, email, role, preference } = req.body;
    // Email must be unique
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ name, password:hashedPassword, email , role, preference});
    await newUser.save();

    res.json({ message: "User added successfully" });
  } catch (err) {
    handleError(res, err);
  }
}

// Controller for user sign-in
module.exports.signIn = async (req, res) => {
  console.log("in signIn");
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    // Check if user exists
    console.log("about to query");
    let user = await User.findOne({ email });
    console.log("successful query", user);
    if (!user) {
      return res.status(400).json({ error: "user doesn't exist" });
    }
    console.log("user found");
    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    console.log("correct password");
    // Create and send a JWT token upon successful login
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "4h",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Sign in successful", accessToken, refreshToken});
  } catch (err) {
    handleError(res, err);
  }
}

// Controller for token refresh
module.exports.refreshToken = async (req, res) => {
  try {
    // token in authorization header
    const token = req.headers["authorization"].split(" ")[1];
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

// Read
module.exports.getProfile = async (req, res) => {
  try {
    // Get the token from the header
    const token = req.header('authorization').split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("decoded", decoded.id);
    // Get the user from the decoded token
    let user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // Send the user details excluding the password
    res.json({ user: { name: user.name, email: user.email , preference: user.preference} });
  } catch (err) {
    handleError(res, err);
  }
}

// update
module.exports.updateUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = req.header('authorization').split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      // Email must be unique
      email = req.body.email;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }
      user.email = req.body.email;
    }
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    handleError(res, err);
  }

}


// delete
module.exports.deleteUser = async (req, res) => {
  try {
    // Get the token from the header
    const token = req.header("authorization").split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user by their ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(decoded.userId);

    // Respond with a success message
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    handleError(res, err);
  }
}


