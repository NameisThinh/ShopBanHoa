const express = require("express");
const router = express.Router();

const { addMessage, getMessage } = require("../controllers/ContactController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");


router.route("/message/new").post(addMessage);
router.route("/admin/message/:id").get(isAuthenticatedUser, authorizeRoles("admin"),getMessage)
module.exports = router;
