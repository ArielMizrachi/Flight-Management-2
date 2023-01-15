const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')


const {AddFlights, GetFlights, GetOneFlight, GetMyFlights, UpdateFlight, DeleteFlight} = require('../controllers/flight_controler')

// goes first to the middleware , next , function

router.route('/GetFlight/').get(GetFlights)
router.route('/GetFlight/:id').get(GetOneFlight)
router.route('/GetMyFlights/').get(AuthMiddleware,GetMyFlights)
router.route('/AddFlights/').post(AuthMiddleware,AddFlights)
router.route('/DelFlights/:id').delete(AuthMiddleware, DeleteFlight)
router.route('/PutFlight/:id').put(AuthMiddleware, UpdateFlight)

module.exports = router
