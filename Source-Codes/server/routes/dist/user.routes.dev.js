"use strict";

var express = require("express");

var _require = require("express-validator"),
    body = _require.body;

var User = require("../Models/user.model");

var _require2 = require("../Controllers/user.controller"),
    signIn = _require2.signIn,
    getProfile = _require2.getProfile,
    updateProfile = _require2.updateProfile,
    deleteUser = _require2.deleteUser,
    refreshToken = _require2.refreshToken,
    signout = _require2.signout,
    getAllUsers = _require2.getAllUsers,
    tempSignUp = _require2.tempSignUp,
    finalSignUp = _require2.finalSignUp,
    basicSignUp = _require2.basicSignUp,
    preferenceSignUp = _require2.preferenceSignUp; // recordRoutes is an instance of the express router.


var recordRoutes = express.Router(); // test api

recordRoutes.route("/getAllUsers").get(getAllUsers); // Sign-Up Route Step 1 of 2

recordRoutes.route("/signup-temp").post(tempSignUp); // Sign-Up Route Step 2 of 2

recordRoutes.route("/signup-final").post(finalSignUp); // Sign-In Route

recordRoutes.route("/signin").post([// Validate email (required)
body("email").notEmpty().withMessage("Email is required"), // Validate password (required)
body("password").notEmpty().withMessage("Password is required")], signIn); // Update Profile Route

recordRoutes.route("/updateprofile").patch(updateProfile); // Sign-Out Route

recordRoutes.route("/signout").post(signout); // Get User Profile Route

recordRoutes.route("/getuser").get(getProfile); // refresh token api to generate new access token

recordRoutes.route("/refreshToken").post(refreshToken); // Delete User

recordRoutes.route("/deleteuser")["delete"](deleteUser);
module.exports = recordRoutes; // Code that was used before but now is not bieng used in the project
//
// // Previosuly Used Sign-Up Route
// recordRoutes.route("/signup").post(
//   [
//     // Validate name (required)
//     body("name").notEmpty().withMessage("Name is required"),
//     // Validate email (required and must be an email)
//     body("email")
//       .notEmpty()
//       .withMessage("Email is required")
//       .isEmail()
//       .withMessage("Invalid email format"),
//     // Validate password (required and must be at least 6 characters)
//     body("password")
//       .notEmpty()
//       .withMessage("Password is required")
//       .isLength({ min: 8 })
//       .withMessage("Password must be at least 8 characters long"),
//     body("preferences")
//       .notEmpty()
//       .withMessage("Preferances are required")
//       .isLength({ min: 4 })
//       .withMessage("Preferances must be defined"),
//   ],
//   signUp
// );
//
// // Temp Sign-Up Route - Step 1 of 2
// recordRoutes.route("/signup/basic").post(basicSignUp);
// // Temp Sign-Up Route - Step 2 of 2
// recordRoutes.route("/signup/preference").post(preferenceSignUp);