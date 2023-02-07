
const Flight = require('../models/Flights')
const Airline = require('../models/Airlines')
const Country = require('../models/Countries')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { BadRequestError, NotFoundError } = require('../errors')


// getting all of the users
const GetFlights= async (req,res) => {

    const flist = []
    const all_flights = await Flight.find({}).populate(["airline_company","origin_country","destenation_country"])

    // getting all of the user in a certain format (the serializer i in the model)
    all_flights.map(flight => { flist.push(flight.FlightsSerializer()) })

    res.status(StatusCodes.OK).json(flist)
}



// getting just one flight
const GetOneFlight = async (req,res) => {

  // fine the flight
    const id = req.params.id
    const chk_flight = await Flight.findOne({flight_id: id}).populate(["airline_company","origin_country","destenation_country"])
      if (!chk_flight) {
        throw new NotFoundError(`No flight with id: ${id}`)
      }
    const one_flight = chk_flight.FlightsSerializer()
      res.status(StatusCodes.OK).json( one_flight )
}



// // getting all of the company flights
const GetMyFlights = async (req,res) => {

  const flist = []
  // finding the user then the airline and then the lights
  const user_id =req.user._id
   //  find[{}] returns a list (of dicktionaries)
  const airline = await Airline.find({user: user_id})

  // finding all of the flights of the specific airline
  const my_flights = await Flight.find({airline_company: airline[0]._id}).populate(["airline_company","origin_country","destenation_country"])
  my_flights.map(flight => { flist.push(flight.FlightsSerializer()) })

 
  res.status(StatusCodes.OK).json({ "my_flights":flist , "company_name":airline[0].name })
}



// add a new flight
const AddFlights = async (req,res) => {

  // adding the country,airline and dates into the flight
  const temp_body = req.body
  temp_body["airline_company"] = await Airline.findOne({name: req.body.airline_company})
  temp_body["origin_country"] = await Country.findOne({name: req.body.origin_country})
  temp_body["destenation_country"] = await Country.findOne({name: req.body.destenation_country})

//   formating the date
// the split is removing \:'' (and builds a list) while using the new format to build the date 
  const DFormat = req.body.departure_time.split(/[/: ]+/)
  temp_body["departure_time"] = new Date("20".concat(DFormat[2]), DFormat[1] -1, DFormat[0], DFormat[3], DFormat[4]);

  const LFormat = req.body.landing_time.split(/[/: ]+/)
  temp_body["landing_time"] = new Date("20".concat(LFormat[2]), LFormat[1] -1, LFormat[0], LFormat[3], LFormat[4]);

  await Flight.create(req.body)
  res.status(StatusCodes.OK).json({'POST':temp_body.airline_company.name})
}



// update a flight
const UpdateFlight = async (req,res) => {

  // getting the flight id
    const flight_id = req.params.id

  // adding the diffrent objectid and formating the date
    const temp_body = req.body
    temp_body["airline_company"] = await Airline.findOne({name: req.body.airline_company})
    temp_body["origin_country"] = await Country.findOne({name: req.body.origin_country})
    temp_body["destenation_country"] = await Country.findOne({name: req.body.destenation_country})

    const DFormat = req.body.departure_time.split(/[/: ]+/)
    temp_body["departure_time"] = new Date("20".concat(DFormat[2]), DFormat[1] -1, DFormat[0], DFormat[3], DFormat[4]);
  
    const LFormat = req.body.landing_time.split(/[/: ]+/)
    temp_body["landing_time"] = new Date("20".concat(LFormat[2]), LFormat[1] -1, LFormat[0], LFormat[3], LFormat[4]);
  
    const updated_flight = await Flight.findOneAndUpdate({flight_id: flight_id},
                                                              temp_body,
                                                             {new:true,runValidators:true})
    if (!updated_flight) {
         throw new NotFoundError(`No flight with id ${flight_id}`)
    }   
    res.status(StatusCodes.OK).json({ updated_flight })                                     
}


// // delete a flight
const DeleteFlight = async (req,res) => {
  const id = req.params.id
  const deleted_flight = await Flight.findOneAndRemove({flight_id:id})
  if (!deleted_flight) {
      throw new NotFoundError(`No flight with id ${id}`)
  }   
  res.status(StatusCodes.OK).send('done') 
}

module.exports={
    GetFlights,
    GetOneFlight,
    GetMyFlights,
    AddFlights,
    DeleteFlight,
    UpdateFlight,
}