const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')


const {AddCountry,GetCountries, GetCountriesName} = require('../controllers/countries_controler')

// goes first to the middleware , next , function

router.route('/GetCountries').get(GetCountries)
router.route('/GetCountriesName/').get(GetCountriesName)
// router.route('/GetUsers/:id').get(GetOneUser)
router.route('/AddCountries/').post(AuthMiddleware,AddCountry)
// router.route('/DelUser/:id').delete(AuthMiddleware, DeleteUser)
// router.route('/PutUser/:id').put(AuthMiddleware, UpdateUser)

module.exports = router
