const express = require('express');
const router = express.Router();

const userController = require('../controller/users');


router.post("/add", userController.addUser);

router.post("/login", userController.login);

module.exports = router;