const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')


const { GetAirlines, GetOneAirline ,IsAirline, AddAirline, DeleteAirline, UpdateAirline} = require('../controllers/airlines_conroler')

// goes first to the middleware , next , function

router.route('/GetAirlines/').get(GetAirlines)
router.route('/GetAirlines/:id').get(GetOneAirline)
router.route('/IsAirline/').get(IsAirline)
router.route('/AddAirline/').post(AuthMiddleware,AddAirline)
router.route('/DelAirline/:id').delete(AuthMiddleware, DeleteAirline)
router.route('/PutAirline/:id').put(AuthMiddleware, UpdateAirline)

module.exports = router
