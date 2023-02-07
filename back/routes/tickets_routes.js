const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')


const {AddTicket, GetTickets, GetOneTicket, GetMyTickets, DeleteTicket, UpdateTicket} = require('../controllers/ticket_controler')

// goes first to the middleware , next , function

router.route('/GetTickets/').get(GetTickets)
router.route('/GetTickets/:id').get(GetOneTicket)
router.route('/GetCustomerTickets/').get(AuthMiddleware,GetMyTickets)
router.route('/AddTickets/').post(AuthMiddleware,AddTicket)
router.route('/DelTicets/:id').delete(AuthMiddleware, DeleteTicket)
router.route('/PutTickets/:id').put(AuthMiddleware, UpdateTicket)

module.exports = router
