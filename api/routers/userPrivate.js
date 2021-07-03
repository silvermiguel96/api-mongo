const express = require('express');
const router = express.Router();

const userController = require('../controller/users');


router.get("/users", userController.getUsers);

module.exports = router;