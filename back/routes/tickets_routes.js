const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')


const {AddTicket, GetTickets, GetOneTicket, GetMyTickets} = require('../controllers/ticket_controler')

// goes first to the middleware , next , function

router.route('/GetTickets/').get(GetTickets)
router.route('/GetTickets/:id').get(GetOneTicket)
router.route('/GetCustomerTickets/').get(AuthMiddleware,GetMyTickets)
router.route('/AddTickets/').post(AuthMiddleware,AddTicket)
// router.route('/DelAirline/:id').delete(AuthMiddleware, DeleteAirline)
// router.route('/PutAirline/:id').put(AuthMiddleware, UpdateAirline)

module.exports = router
