const express = require('express');
const router = express.Router();

const Login = require('../controllers/login_controler')

// goes first to the middleware , next , dashboard 
router.route('/token/').post(Login)

module.exports = router
