const User = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Centralized error handling middleware
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};

// Controller for get all-users - Done
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for user sign-up-2-step-step1 - Done
module.exports.tempSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      preferences: null, // Leave preferences as null initially
    });

    await newUser.save();

    res.json({
      message: "Basic Info Stored",
      name,
      email,
    });
  } catch (err) {
    console.error("Error in basicSignUp:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for user sign-up-2-step-step2 - Done
module.exports.finalSignUp = async (req, res) => {
  const {
    email,
    investmentGoals,
    riskTolerance,
    amountToInvest,
    preferredIndustries,
    stockType,
  } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const formattedAmountToInvest = parseFloat(amountToInvest);

    // Update the user's preferences
    user.preferences = {
      investmentGoals,
      riskTolerance,
      amountToInvest: formattedAmountToInvest,
      preferredIndustries,
      stockType,
    };

    // Save the updated user document
    await user.save();

    res.json({
      message: "Preferences updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Controller for user sign-in - Done
module.exports.signIn = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not registered!" });
    }
    console.log("user found");

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // console.log(password);
      // console.log(user.password);
      return res.status(400).json({ error: "Incorrect password!" });
    }
    console.log("correct password");
    // Create and send a JWT token upon successful login
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "4h",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // save the token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      //maxAge: 1000 * 60 * 60 * 4
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      //maxAge: 1000 * 60 * 60 * 24
    });

    res.json({
      message: "Sign in successful",
      email: user.email,
      name: user.name,
      preferences: user.preferences,
      conversations: user.conversations,
    });

    //console.log("access token cookie: ",req.cookies.accessToken);
  } catch (err) {
    handleError(res, err);
  }
};

// Controller for update-profile - Done
module.exports.updateProfile = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // const token = req.header("authorization").split(" ")[1];
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const updatedUser = {};
    if (req.body.name) {
      updatedUser.name = req.body.name;
    }

    if (req.body.password && req.body.password !== "") {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updatedUser.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(decoded.id, updatedUser, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    res.json({
      name: user.name,
      cookie: token,
    });
  } catch (err) {
    console.log(err.message);
    handleError(res, err);
  }
};

// Controller for save-conversation - Done
module.exports.saveConversation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;
    const { conversationID, ticker } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const conversationExists = user.conversations.some(
      (conversation) => conversation.conversationID === conversationID
    );

    if (conversationExists) {
      return res
        .status(400)
        .json({ error: "Conversation already exists for this user" });
    }

    user.conversations.push({ conversationID, ticker });
    await user.save();

    res.json({ message: "Conversation saved successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Controller for sign-out - Done
module.exports.signout = async (req, res) => {
  try {
    // Clear the JSON Web Token cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    console.log("User signed out");
    res.json({ message: "User logged out successfully" });
  } catch (err) {
    handleError(res, err);
  }
};

// Controller for get-profile - Done 
module.exports.getProfile = async (req, res) => {
  try {
    // Get the token from the header
    const token = req.header("authorization").split(" ")[1];
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
    res.json({
      user: {
        name: user.name,
        email: user.email,
        preference: user.preferences,
      },
    });
  } catch (err) {
    handleError(res, err);
  }
};

// Controller for token refresh
module.exports.refreshToken = async (req, res) => {
  try {
    // token in authorization header
    const token = req.headers["authorization"].split(" ")[1];
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Controller for delete-user 
module.exports.deleteUser = async (req, res) => {
  try {
    // Get the email address from the request body
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ error: "Email address is required" });
    }

    // Find the user by their email address
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(user._id);

    // Respond with a success message
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    handleError(res, err);
  }
};

// // Controller for user sign-up - Done
// module.exports.signUp = async (req, res) => {
//   // Check for validation errors
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { name, password, email, role, preferences } = req.body;
//     // Email must be unique
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     // Create a new user
//     const newUser = new User({
//       name,
//       password: hashedPassword,
//       email,
//       role,
//       preferences,
//     });

//     await newUser.save();

//     const accessToken = jwt.sign(
//       { id: newUser._id },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: "4h",
//       }
//     );
//     const refreshToken = jwt.sign(
//       { id: newUser._id },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     // save the token in cookie
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "strict",
//       maxAge: 1000 * 60 * 60 * 4,
//       // 4 hours
//     });

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "strict",
//       maxAge: 1000 * 60 * 60 * 24,
//       // 1 day
//     });

//     res.json({
//       message: "Sign up successful",
//       accessToken,
//       refreshToken,
//       email,
//       name,
//       preferences,
//     });
//   } catch (err) {
//     handleError(res, err);
//   }
// };

// Controller for delete-user - May use later
// module.exports.deleteUser = async (req, res) => {
//   try {
//     // Get the token from the header
//     const token = req.header("authorization").split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ error: "You must be logged in" });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // Find the user by their ID
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(400).json({ error: "User does not exist" });
//     }

//     // Delete the user from the database
//     await User.findByIdAndDelete(decoded.userId);

//     // Respond with a success message
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     handleError(res, err);
//   }
// };
