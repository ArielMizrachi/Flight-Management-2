
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

// getting just one customer
const GetOneCustomer = async (req,res) => {

  // fine the customer
    const id = req.params.id
    const chk_customer = await Customer.findOne({customer_id: id})
      if (!chk_customer) {
        throw new NotFoundError(`No Customer with id: ${id}`)
      }
    const one_customer = chk_customer.CustomerSerializer()
      res.status(StatusCodes.OK).json( one_customer )
}

// checking if a user is customer
const IsCustomer = async (req,res) => {

  // const my_user = await User.findOne({user_id: req.user.id})
  const chk_customer = await Customer.findOne({user: req.user._id})
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
  temp_body["user"] =await User.findOne({user_id: req.user.user_id})
  const new_customer = await Customer.create(req.body)
  
  res.status(StatusCodes.OK).json({ new_customer }) 
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
    GetOneCustomer,
    AddCustomer,
    IsCustomer,
    DeleteCustomer,
    UpdateCustomer,
}