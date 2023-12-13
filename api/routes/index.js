const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');

// TODO: JWT authentication middleware
// TODO: Permissions authorization middleware

router

   // User Module
   .post('/user/register', UserController.register)
   .post('/user/login', UserController.login)
   .get('/user/:id', UserController.register)
   .post('/user/:id/update-profile', UserController.register);

module.exports = router;
