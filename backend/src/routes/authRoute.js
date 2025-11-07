const express = require("express");
const ctrl = require('../controllers/userController');
const router = express.Router();

// Auth routes
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.put("/edit/:id", ctrl.edit); // edit user berdasarkan id
router.post("/logout", ctrl.logout); // logout user

module.exports = router;
