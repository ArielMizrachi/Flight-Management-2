const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const {Schema} = require('mongoose');


const TicketsSchema = new mongoose.Schema({
    flight:{
        type: Schema.Types.ObjectId,
        ref: 'Flights',
        required: true,
    },
    customer:{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },

})

// getting an auto increment id
TicketsSchema.plugin(AutoIncrement, {inc_field: 'ticket_id'});


// // serializer for customer
TicketsSchema.methods.TicketSerializer = function(){
    return {id:this.ticket_id,
            flight:this.flight.flight_id,
            origin_country:this.flight.origin_country.name,
            destenation_country:this.flight.destenation_country.name,
            customer: this.customer.first_name}
}

module.exports = mongoose.model('Tickets',TicketsSchema)