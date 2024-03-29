const express = require("express");
const { body } = require("express-validator");
const User = require("../models/user.model");
const { signUp, signIn, getProfile, updateUser, deleteUser, refreshToken } = require("../Controllers/user.controller");

// recordRoutes is an instance of the express router.
const recordRoutes = express.Router();


// test api
recordRoutes.route("/getAllUsers").get(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// signup and signin api
recordRoutes.route("/signUp").post(
  [
    // Validate name (required)
    body("name").notEmpty().withMessage("Name is required"),

    // Validate email (required and must be an email)
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    // Validate password (required and must be at least 6 characters)
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),

    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isLength({ min: 4 })
        .withMessage("Role must be at least 4 characters long"),
    
    body("preference")
        .notEmpty()
        .withMessage("Preferance is required")
        .isLength({ min: 4 })
        .withMessage("Preferance must be defined"),
  ],
  signUp
);

recordRoutes.route("/signIn").post(
  [
    // Validate email (required)
    body("email")
      .notEmpty()
      .withMessage("Email is required"),


    // Validate password (required)
    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  signIn
);

// refresh token api to generate new access token
recordRoutes.route("/refreshToken").post(refreshToken);

recordRoutes.route("/user").get(getProfile);

recordRoutes.route("/user").patch(
  [
    // Validate name (optional)
    body("name").optional().notEmpty().withMessage("Name is required"),

    // Validate email (optional and must be an email)
    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email format"),

    // Validate password (optional and must be at least 6 characters)
    body("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  updateUser
);

recordRoutes.route("/user").delete(deleteUser);



module.exports = recordRoutes;