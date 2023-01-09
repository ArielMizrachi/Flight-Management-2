
const Customer = require('../models/Customer')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, NotFoundError } = require('../errors')

const mongoose = require('mongoose')



// getting all of the customers
const GetCustomers = async (req,res) => {

    // using populate to replace the objectid with the real object
    const clist = []
    const all_customers = await Customer.find({}).populate("user")

    // getting all of the customers in a certain format (the serializer i in the model)
    all_customers.map(customer => { clist.push(customer.CustomerSerializer()) })
    res.status(StatusCodes.OK).json(clist)

}


// checking if a user is customer
const IsCustomer = async (req,res) => {
  const id =req.user._id
  const chk_customer = await Customer.findOne({user: id})
      if (!chk_customer) {
        return res.status(StatusCodes.OK).json({"is_cutomer": false,
                                                "customer_id": ""
                                              })
      }
  res.status(StatusCodes.OK).json({"is_cutomer": true,
                                  "customer_id": chk_customer.customer_id
                                })
}



// add a new customer
const AddCustomer = async (req,res) => {

  const temp_body = req.body
  temp_body["user"] = req.user._id
  const new_customer = await Customer.create(req.body)
  
  res.send(new_customer)
}


// update a customer
const UpdateCustomer = async (req,res) => {
    customer_id = req.params.id
    const updated_customer = await Customer.findOneAndUpdate({customer_id: customer_id},
                                                              req.body,
                                                             {new:true,runValidators:true})
    if (!updated_customer) {
         throw new NotFoundError(`No customer with id ${customer_id}`)
    }   
    res.status(StatusCodes.OK).json({ updated_customer })                                     
}


// delete a customer
const DeleteCustomer = async (req,res) => {

    customer_id = req.params.id
    const deleted_customer = await Customer.findOneAndRemove({customer_id:customer_id})
    if (!deleted_customer) {
        throw new NotFoundError(`No customer with id ${id}`)
    }   
    res.status(StatusCodes.OK).send('done')     

}


module.exports={
    GetCustomers,
    AddCustomer,
    IsCustomer,
    DeleteCustomer,
    UpdateCustomer,
}