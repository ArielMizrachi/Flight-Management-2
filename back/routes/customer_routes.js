const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')


const {AddCustomer, GetCustomers, IsCustomer, DeleteCustomer, UpdateCustomer} = require('../controllers/customer_controler')

// goes first to the middleware , next , function

router.route('/GetCustomers/').get(AuthMiddleware,GetCustomers)
router.route('/IsCustomer/').get(AuthMiddleware,IsCustomer)
router.route('/AddCustomers/').post(AuthMiddleware,AddCustomer)
router.route('/DelCustomers/:id').delete(AuthMiddleware, DeleteCustomer)
router.route('/PutCustomers/:id').put(AuthMiddleware, UpdateCustomer)


module.exports = router
