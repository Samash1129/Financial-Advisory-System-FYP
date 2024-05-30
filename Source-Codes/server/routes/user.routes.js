const express = require("express");
const { body } = require("express-validator");
const {
  /*signUp,*/
  signIn,
  getProfile,
  updateProfile,
  deleteUser,
  refreshToken,
  signout,
  getAllUsers,
  tempSignUp,
  finalSignUp,
  saveConversation,
} = require("../Controllers/user.controller");

// recordRoutes is an instance of the express router.
const recordRoutes = express.Router();

recordRoutes.route("/getAllUsers").get(getAllUsers);
recordRoutes.route("/signin").post(
  [
    // Validate email (required)
    body("email").notEmpty().withMessage("Email is required"),

    // Validate password (required)
    body("password").notEmpty().withMessage("Password is required"),
  ],
  signIn
);
recordRoutes.route("/updateprofile").patch(updateProfile);
recordRoutes.route("/signout").post(signout);
recordRoutes.route("/getuser").get(getProfile);
// recordRoutes.route("/refreshToken").post(refreshToken);
recordRoutes.route("/deleteuser").delete(deleteUser);
recordRoutes.route("/signup-temp").post(tempSignUp);
recordRoutes.route("/signup-final").post(finalSignUp);
recordRoutes.route("/save-conversation").post(saveConversation);

module.exports = recordRoutes;

// // signup and signin api
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
