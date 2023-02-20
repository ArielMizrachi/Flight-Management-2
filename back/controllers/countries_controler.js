const Countries = require('../models/Countries')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');


// getting all of the countries
const GetCountries = async (req,res) => {

    const clist = []
    const all_countries = await Countries.find({})

    // getting all of the customers in a certain format (the serializer i in the model)
    all_countries.map(country => { clist.push(country.CountriesSerializer()) })
    res.status(StatusCodes.OK).json(clist)

}


// getting one country
const GetOneCountry = async (req,res) => {
  console.log('in get one country')
  const country_id = req.params.id
  const chk_country = await Countries.findOne({country_id: country_id})

      if (!chk_country) {
        throw new NotFoundError(`No Customer with id: ${country_id}`)
      }
    const one_country = chk_country.CountriesSerializer()
      res.status(StatusCodes.OK).json( one_country )
}


// getting all of the countries
const GetCountriesName = async (req,res) => {
  const cnlist = []
  const all_countries = await Countries.find({})
  
  // getting all of the countries names
  all_countries.map(country => { cnlist.push(country.name)})
  res.status(StatusCodes.OK).json(cnlist)

}



// add a new country
const AddCountry = async (req,res) => {

  const temp_body = req.body
  // check if we got a flag image (give a default)
  if (!req.files || !Object.keys(req.files).length) {
    temp_body["flag"] = "flag.jpg"
  }
  else{
    temp_body["flag"] = req.files[0].filename
  }
  const new_country = await Countries.create(temp_body)

  res.status(StatusCodes.OK).json({'COUNTRY' :'new_country'})
}


//  update a country
const UpdateCountry = async (req,res) => {

    const country_id = req.params.id
    const temp_body = {}

    // setting the temp body
    temp_body["name"] = req.body.name
    if (Object.keys(req.files).length !== 0) {
      temp_body["flag"] = req.files[0].filename
    }

    const updated_country = await Countries.findOneAndUpdate({country_id: country_id},
                                                              temp_body,
                                                             {new:true,runValidators:true})
    if (!updated_country) {
         throw new NotFoundError(`No customer with id ${country_id}`)
    }   
    res.status(StatusCodes.OK).json({ updated_country })                                     
}


// // delete a country
const DeleteCountry = async (req,res) => {

    country_id = req.params.id
    const deleted_country = await Countries.findOneAndRemove({country_id:country_id})
    if (!deleted_country) {
        throw new NotFoundError(`No country with id ${country_id}`)
    }  

    // delete the flag file being deleted (umless it's the default)
    if(deleted_country.flag !== 'flag.jpg'){
    const filePath = path.join(__dirname, '../uploads/', `${deleted_country.flag}`);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

    res.status(StatusCodes.OK).send('done')     

}


module.exports={
  GetCountries,
  GetOneCountry,
  GetCountriesName,
  AddCountry,
  DeleteCountry,
  UpdateCountry,
}