const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')
// for getting the user when you dont use auth
const UserGetter = require ('../middleware/user_getter')

const { GetAirlines, GetOneAirline ,IsAirline,GetAirlinesName, AddAirline, DeleteAirline, UpdateAirline} = require('../controllers/airlines_conroler')

// goes first to the middleware , next , function

router.route('/GetAirlines/').get(GetAirlines)
router.route('/GetAirlines/:id').get(GetOneAirline)
router.route('/IsAirline/').get(UserGetter,IsAirline)
router.route('/GetAirlinesName/').get(GetAirlinesName)
router.route('/AddAirline/').post(AuthMiddleware,AddAirline)
router.route('/DelAirline/:id').delete(AuthMiddleware, DeleteAirline)
router.route('/PutAirline/:id').put(AuthMiddleware, UpdateAirline)

module.exports = router
