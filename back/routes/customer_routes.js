const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')
// for getting the user when you dont use auth
const UserGetter = require ('../middleware/user_getter')

const {AddCustomer, GetCustomers,GetOneCustomer, IsCustomer, DeleteCustomer, UpdateCustomer} = require('../controllers/customer_controler')

// goes first to the middleware , next , function

router.route('/GetCustomers/').get(GetCustomers)
router.route('/GetCustomers/:id').get(GetOneCustomer)
router.route('/IsCustomer/').get(UserGetter,IsCustomer)
router.route('/AddCustomers/').post(AuthMiddleware,AddCustomer)
router.route('/DelCustomers/:id').delete(AuthMiddleware, DeleteCustomer)
router.route('/PutCustomers/:id').put(AuthMiddleware, UpdateCustomer)


module.exports = router
