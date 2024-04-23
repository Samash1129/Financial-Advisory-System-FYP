"use strict";

var User = require("../Models/user.model");

var bcrypt = require("bcryptjs");

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var jwt = require("jsonwebtoken"); // Centralized error handling middleware


var handleError = function handleError(res, error) {
  console.error(error);
  res.status(500).json({
    error: "Internal server error"
  });
}; // Controller for get all-users - Done


module.exports.getAllUsers = function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context.sent;
          res.json(users);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Controller for user sign-up-2-step-step1 - Done


module.exports.tempSignUp = function _callee2(req, res) {
  var _req$body, name, email, password, user, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (!user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: "User already registered!"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          hashedPassword = _context2.sent;
          newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            preferences: null // Leave preferences as null initially

          });
          _context2.next = 13;
          return regeneratorRuntime.awrap(newUser.save());

        case 13:
          res.json({
            message: "Basic Info Stored",
            name: name,
            email: email
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          console.error("Error in basicSignUp:", _context2.t0);
          res.status(500).json({
            error: "Internal Server Error"
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
}; // Controller for user sign-up-2-step-step2 - Done


module.exports.finalSignUp = function _callee3(req, res) {
  var _req$body2, email, investmentGoals, riskTolerance, amountToInvest, preferredIndustries, stockType, user, formattedAmountToInvest;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, investmentGoals = _req$body2.investmentGoals, riskTolerance = _req$body2.riskTolerance, amountToInvest = _req$body2.amountToInvest, preferredIndustries = _req$body2.preferredIndustries, stockType = _req$body2.stockType;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            error: "User not found"
          }));

        case 7:
          formattedAmountToInvest = parseFloat(amountToInvest); // Update the user's preferences

          user.preferences = {
            investmentGoals: investmentGoals,
            riskTolerance: riskTolerance,
            amountToInvest: formattedAmountToInvest,
            preferredIndustries: preferredIndustries,
            stockType: stockType
          }; // Save the updated user document

          _context3.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.json({
            message: "Preferences updated successfully",
            user: user
          });
          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          res.status(500).json({
            error: "Error creating user"
          });

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 14]]);
}; // Controller for user sign-in - Done


module.exports.signIn = function _callee4(req, res) {
  var errors, _req$body3, email, password, user, passwordMatch, accessToken, refreshToken;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // Check for validation errors
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context4.prev = 3;
          _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
          _context4.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context4.sent;

          if (user) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: "User not registered!"
          }));

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 12:
          passwordMatch = _context4.sent;

          if (passwordMatch) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: "Incorrect password!"
          }));

        case 15:
          console.log("correct password"); // Create and send a JWT token upon successful login

          accessToken = jwt.sign({
            id: user._id
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "4h"
          });
          refreshToken = jwt.sign({
            id: user._id
          }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
          }); // save the token in cookie

          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None" //maxAge: 1000 * 60 * 60 * 4

          });
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None" //maxAge: 1000 * 60 * 60 * 24

          });
          res.json({
            message: "Sign in successful",
            email: user.email,
            name: user.name,
            preferences: user.preferences
          }); //console.log("access token cookie: ",req.cookies.accessToken);

          _context4.next = 26;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](3);
          handleError(res, _context4.t0);

        case 26:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 23]]);
}; // Controller for update-profile - Done


module.exports.updateProfile = function _callee5(req, res) {
  var errors, token, decoded, updatedUser, hashedPassword, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // Check for validation errors
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context5.prev = 3;
          // const token = req.header("authorization").split(" ")[1];
          token = req.cookies.accessToken;

          if (token) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(401).json({
            error: "You must be logged in"
          }));

        case 7:
          decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          updatedUser = {};

          if (req.body.name) {
            updatedUser.name = req.body.name;
          }

          if (!(req.body.password && req.body.password !== "")) {
            _context5.next = 15;
            break;
          }

          _context5.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 13:
          hashedPassword = _context5.sent;
          updatedUser.password = hashedPassword;

        case 15:
          _context5.next = 17;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(decoded.id, updatedUser, {
            "new": true
          }));

        case 17:
          user = _context5.sent;

          if (user) {
            _context5.next = 20;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            error: "User does not exist"
          }));

        case 20:
          res.json({
            name: user.name,
            cookie: token
          });
          _context5.next = 27;
          break;

        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](3);
          console.log(_context5.t0.message);
          handleError(res, _context5.t0);

        case 27:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 23]]);
}; // Controller for sign-out - Done


module.exports.signout = function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          try {
            // Clear the JSON Web Token cookies
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            console.log("User signed out");
            res.json({
              message: "User logged out successfully"
            });
          } catch (err) {
            handleError(res, err);
          }

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // Controller for get-profile - Done


module.exports.getProfile = function _callee7(req, res) {
  var token, decoded, user;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          // Get the token from the header
          token = req.header("authorization").split(" ")[1];

          if (token) {
            _context7.next = 4;
            break;
          }

          return _context7.abrupt("return", res.status(401).json({
            error: "You must be logged in"
          }));

        case 4:
          // Verify the token
          decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          console.log("decoded", decoded.id); // Get the user from the decoded token

          _context7.next = 8;
          return regeneratorRuntime.awrap(User.findById(decoded.id));

        case 8:
          user = _context7.sent;

          if (user) {
            _context7.next = 11;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            error: "User does not exist"
          }));

        case 11:
          // Send the user details excluding the password
          res.json({
            user: {
              name: user.name,
              email: user.email,
              preference: user.preferences
            }
          });
          _context7.next = 17;
          break;

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          handleError(res, _context7.t0);

        case 17:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; // Controller for token refresh


module.exports.refreshToken = function _callee8(req, res) {
  var token, user, accessToken;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          try {
            // token in authorization header
            token = req.headers["authorization"].split(" ")[1];
            user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            accessToken = jwt.sign({
              id: user.id
            }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: "1h"
            });
            res.json({
              accessToken: accessToken
            });
          } catch (err) {
            res.status(500).json({
              message: err
            });
          }

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}; // Controller for delete-user - May use later


module.exports.deleteUser = function _callee9(req, res) {
  var email, user;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          // Get the email address from the request body
          email = req.body.email;

          if (email) {
            _context9.next = 4;
            break;
          }

          return _context9.abrupt("return", res.status(400).json({
            error: "Email address is required"
          }));

        case 4:
          _context9.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          user = _context9.sent;

          if (user) {
            _context9.next = 9;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            error: "User not found"
          }));

        case 9:
          _context9.next = 11;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(user._id));

        case 11:
          // Respond with a success message
          res.json({
            message: "User deleted successfully"
          });
          _context9.next = 17;
          break;

        case 14:
          _context9.prev = 14;
          _context9.t0 = _context9["catch"](0);
          handleError(res, _context9.t0);

        case 17:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; // Code that was used before but now is not bieng used in the project
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
//   // Controller for user sign-up-2-step-step1 - Done
// module.exports.basicSignUp = async (req, res) => {
//   const { name, email, password } = req.body;
//   req.session.basicSignUpInfo = { name, email, password };
//   // console.log(req.session.basicSignUpInfo);
//   res.json({
//     message: "Basic Info Stored",
//     name,
//     email,
//   });
// };
// // Controller for user sign-up-2-step-step2 - Done
// module.exports.preferenceSignUp = async (req, res) => {
//   try {
//     // Retrieve basic sign-up information from session
//     const basicSignUp = req.session.basicSignUpInfo;
//     if (!basicSignUp || typeof basicSignUp !== "object") {
//       return res
//         .status(400)
//         .json({ error: "Basic sign-up information is missing or invalid" });
//     }
//     const {
//       investmentGoals,
//       riskTolerence,
//       amountToInvest,
//       preferredIndustries,
//       stockType,
//     } = req.body;
//     // console.log({
//     //   investmentGoals,
//     //   riskTolerence,
//     //   amountToInvest,
//     //   preferredIndustries,
//     //   stockType,
//     // });
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(basicSignUp.password, 10);
//     // Create a new user with preferences
//     const newUser = new User({
//       name: basicSignUp.name,
//       email: basicSignUp.email,
//       password: hashedPassword,
//       preferences: {
//         investmentGoals,
//         riskTolerence,
//         amountToInvest,
//         preferredIndustries,
//         stockType,
//       },
//     });
//     // Save the user to the database
//     const savedUser = await newUser.save();
//     // Clear the basic sign-up information from the session
//     req.session.basicSignUp = null;
//     // Respond with success message and user details
//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         name: savedUser.name,
//         email: savedUser.email,
//         investmentGoals: savedUser.preferences.investmentGoals,
//         riskTolerance: savedUser.preferences.riskTolerance,
//         amountToInvest: savedUser.preferences.amountToInvest,
//         preferredIndustries: savedUser.preferences.preferredIndustries,
//         stockType: savedUser.preferences.stockType,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error creating user" });
//   }
// };