const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')


const {RegisterUser, GetUsers, GetOneUser,DeleteUser, UpdateUser, GetUserName} = require('../controllers/users_controler')

// goes first to the middleware , next , function

router.route('/GetUsers').get(GetUsers)
router.route('/GetUsers/:id').get(GetOneUser)
router.route('/GetUsersName').get(GetUserName)
router.route('/RegisterUser/').post(RegisterUser)
router.route('/DelUser/:id').delete(AuthMiddleware, DeleteUser)
router.route('/PutUser/:id').put(AuthMiddleware, UpdateUser)

module.exports = router
