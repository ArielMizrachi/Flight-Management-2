
const Ticket = require('../models/Tickets')
const Customer = require('../models/Customer')
const Flight = require('../models/Flights')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, NotFoundError } = require('../errors')

const mongoose = require('mongoose')



// // getting all of the tickets
const GetTickets = async (req,res) => {

  const tlist = []

    // using populate to replace the objectid with the real object and going 1 deep into flight
    const all_tickets = await Ticket.find({}).populate("customer")
    .populate({ path: 'flight',populate: [{path: 'origin_country',model: 'Countries'},
                                          {path: 'destenation_country',model: 'Countries'}] 
   })

    // getting all of the tickets in a certain format (the serializer i in the model)
    all_tickets.map(ticket => { tlist.push(ticket.TicketSerializer()) })
    res.status(StatusCodes.OK).json(tlist)

}




// getting just one ticket
const GetOneTicket = async (req,res) => {

  // find the ticket
    const id = req.params.id
    const chk_ticket = await Ticket.findOne({ticket_id: id}).populate("customer")
    .populate({ path: 'flight',populate: [{path: 'origin_country',model: 'Countries'},
                                          {path: 'destenation_country',model: 'Countries'}] 
   })

      if (!chk_ticket) {
        throw new NotFoundError(`No Ticket with id: ${id}`)
      }
    const one_ticket = chk_ticket.TicketSerializer()
      res.status(StatusCodes.OK).json( one_ticket )
}




// // getting all of the customer tickets
const GetMyTickets= async (req,res) => {

  const tlist = []
  // finding the user then the customer and then the tickets
  const user_id =req.user._id
  const customer = await Customer.findOne({user: user_id})

  // finding all of the tickets of the customer
  const my_tickets = await Ticket.find({customer: customer._id}).populate("customer")
  .populate({ path: 'flight',populate: [{path: 'origin_country',model: 'Countries'},
                                        {path: 'destenation_country',model: 'Countries'}] 
 })

  my_tickets.map(ticket => { tlist.push(ticket.TicketSerializer()) })
  res.status(StatusCodes.OK).json(tlist)
}



// add a new ticket
const AddTicket = async (req,res) => {

  const user_id = req.user._id
  const temp_body ={}

  // defining the customer and flight abd removing the flight id from the body
  temp_body["customer"] = await Customer.findOne({user: user_id})
  temp_body["flight"] = await Flight.findOne({flight_id: req.body.flights_id})

  const new_ticket = await Ticket.create(temp_body)

  res.status(StatusCodes.OK).send(new_ticket)

}


// // update a ticket
const UpdateTicket = async (req,res) => {
    ticket_id = req.params.id
    // creating the updated ticket body
    const temp_body = {}
    temp_body["customer"] = await Customer.findOne({customer_id: req.body.customer_id})
    temp_body["flight"] = await Flight.findOne({flight_id: req.body.flights_id})
    const updated_ticket = await Ticket.findOneAndUpdate({ticket_id: ticket_id},
                                                              temp_body,
                                                             {new:true,runValidators:true})
    if (!updated_ticket) {
         throw new NotFoundError(`No customer with id ${customer_id}`)
    }   
    res.status(StatusCodes.OK).json({ updated_ticket })  
}


// delete a ticket
const DeleteTicket = async (req,res) => {

    ticket_id = req.params.id
    const deleted_ticket = await Ticket.findOneAndRemove({ticket_id:ticket_id})
    if (!deleted_ticket) {
        throw new NotFoundError(`No ticket with id ${id}`)
    }   
    res.status(StatusCodes.OK).send('done')     

}


module.exports={
    GetTickets,
    GetOneTicket,
    GetMyTickets,
    AddTicket,
    DeleteTicket,
    UpdateTicket,
}