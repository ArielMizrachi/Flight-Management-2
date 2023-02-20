const express = require('express');
const router = express.Router();
const AuthMiddleware = require ('../middleware/auth')
const multer = require("multer");
const {AddCountry,GetCountries, GetCountriesName, DeleteCountry, UpdateCountry, GetOneCountry} = require('../controllers/countries_controler')

// muler settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
    //   giving the file a .png ending 
      cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
  });
  
  const upload = multer({ storage });


// goes first to the middleware , next , function
router.route('/GetCountries').get(GetCountries)
router.route('/GetCountries/:id').get(GetOneCountry)
router.route('/GetCountriesName/').get(GetCountriesName)
router.route("/AddCountries/").post(upload.array("flag"), AuthMiddleware, AddCountry)
router.route('/DelCountries/:id').delete(AuthMiddleware, DeleteCountry)
router.route('/PutCountries/:id').put(upload.array("flag"), AuthMiddleware, UpdateCountry)

module.exports = router
