
const Countries = require('../models/Countries')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const mongoose = require('mongoose')



// getting all of the countries
const GetCountries = async (req,res) => {

    // using populate to replace the objectid with the real object
    const clist = []
    const all_countries = await Countries.find({})

    // getting all of the customers in a certain format (the serializer i in the model)
    all_countries.map(country => { clist.push(country.CountriesSerializer()) })
    res.status(StatusCodes.OK).json(clist)

}




// add a new country
const AddCountry = async (req,res) => {

  const temp_body = req.body
  const new_country = await Countries.create(req.body)
  
  res.send(new_country)
}


// // update a customer
// const UpdateCustomer = async (req,res) => {
//     customer_id = req.params.id
//     const updated_customer = await Customer.findOneAndUpdate({customer_id: customer_id},
//                                                               req.body,
//                                                              {new:true,runValidators:true})
//     if (!updated_customer) {
//          throw new NotFoundError(`No customer with id ${customer_id}`)
//     }   
//     res.status(StatusCodes.OK).json({ updated_customer })                                     
// }


// // delete a customer
// const DeleteCustomer = async (req,res) => {

//     customer_id = req.params.id
//     const deleted_customer = await Customer.findOneAndRemove({customer_id:customer_id})
//     if (!deleted_customer) {
//         throw new NotFoundError(`No customer with id ${id}`)
//     }   
//     res.status(StatusCodes.OK).send('done')     

// }


module.exports={
  GetCountries,
  AddCountry,
    // IsCustomer,
    // DeleteCustomer,
    // UpdateCustomer,
}