
const Airline = require('../models/Airlines')
const Country = require('../models/Countries')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, NotFoundError } = require('../errors')

const mongoose = require('mongoose')



// getting all of the Airlines
const GetAirlines = async (req,res) => {

    // using populate to replace the objectid with the real object 
    const alist = []
    const all_airlines = await Airline.find({}).populate(["user","country"])

    // getting all of the airlines in a certain format (the serializer i in the model)
    all_airlines.map(airline => { alist.push(airline.AirlineSerializer()) })
    res.status(StatusCodes.OK).json(alist)

}

// getting just one airline
const GetOneAirline = async (req,res) => {

  // fine the airline
    const id = req.params.id
    const chk_airline = await Airline.findOne({airline_id: id}).populate(["user","country"])
      if (!chk_airline) {
        throw new NotFoundError(`No Airline with id: ${id}`)
      }
    const one_airline = chk_airline.AirlineSerializer()
      res.status(StatusCodes.OK).json( one_airline )
}

// checking if a user is an airline
const IsAirline = async (req,res) => {
  const id =req.user._id
  const chk_airline = await Airline.findOne({user: id})
      if (!chk_airline) {
        return res.status(StatusCodes.OK).json(false)
      }
  res.status(StatusCodes.OK).json(true)
}



// add a new customer
const AddAirline= async (req,res) => {

  // adding the country and user to the airline company
  const temp_body = req.body
  temp_body["user"] = req.user._id
  temp_body["country"] = await Country.findOne({name: req.body.country})
  const new_airline = await Airline.create(req.body)
  
  res.send(new_airline)
}


// update a customer
const UpdateAirline = async (req,res) => {

  // getting the airline id
    const airline_id = req.params.id

  // adding the country into the body 
    const temp_body = req.body
    temp_body["country"] = await Country.findOne({name: req.body.country})

    const updated_airline = await Airline.findOneAndUpdate({airline_id: airline_id},
                                                              temp_body,
                                                             {new:true,runValidators:true})
    if (!updated_airline) {
         throw new NotFoundError(`No airline with id ${airline_id}`)
    }   
    res.status(StatusCodes.OK).json({ updated_airline })                                     
}


// delete a airline
const DeleteAirline = async (req,res) => {

    airline_id = req.params.id
    const deleted_airline = await Airline.findOneAndRemove({airline_id:airline_id})
    if (!deleted_airline) {
        throw new NotFoundError(`No airline with id ${id}`)
    }   
    res.status(StatusCodes.OK).send('done')     

}


module.exports={
  GetAirlines,
  GetOneAirline,
  IsAirline,
  AddAirline,
  UpdateAirline,
  DeleteAirline,
}