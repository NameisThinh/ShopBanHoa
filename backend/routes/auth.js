const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updatePassword,
  updateProfile,
  logout,
  GetAllUsers,
  getUserDetails,
  updateUser,
  forgotPassword
} = require("../controllers/userController");
const { lookUser } = require("../middlewares/lookAccount");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);

router.route("/login").post(lookUser, loginUser);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/forgotPassword").post(forgotPassword);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), GetAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser);

module.exports = router;
