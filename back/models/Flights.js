const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const {Schema} = require('mongoose');
const Ticket = require('../models/Tickets')

const FlightsSchema = new mongoose.Schema({
    airline_company:{
        type: Schema.Types.ObjectId,
        ref: 'Airlines',
        required: true,
    },
    origin_country:{
        type: Schema.Types.ObjectId,
        ref: 'Countries',
        required: true,
    
    },
    destenation_country:{
        type: Schema.Types.ObjectId,
        ref: 'Countries',
        required: true,
    },
    departure_time:{
        type: Date,
        required: true,
    },
    landing_time:{
        type: Date,
        required: true,
    },
    remaining_ticets:{
        type: Number,
        required: true,
    },

})

// getting an auto increment id
FlightsSchema.plugin(AutoIncrement, {inc_field: 'flight_id'});



// remove all the tickets connected to the flight
FlightsSchema.pre(['findOneAndRemove','deleteMany'],async function(next) {

    // get the current flight details
    const current_flight = await this.model.find(this.getQuery())

    for (const flight of current_flight) {
        console.log(flight)
        await Ticket.deleteMany({flight: flight._id});
    }
    next();
});

  

// // serializer for a flight
FlightsSchema.methods.FlightsSerializer = function(){
    return {id:this.flight_id,
            airline_company:this.airline_company.name,
            origin_country: this.origin_country.name,
            destenation_country: this.destenation_country.name,
            departure_time: this.departure_time,
            landing_time: this.landing_time,
            remaining_ticets: this.remaining_ticets}
}

module.exports = mongoose.model('Flights',FlightsSchema)