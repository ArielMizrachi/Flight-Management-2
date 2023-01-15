const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const {Schema} = require('mongoose');
const Flight = require('../models/Flights')


const AirLinesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide first name'],
        minlength:3,
        unique:true,  
    },
    country:{
        type: Schema.Types.ObjectId,
        ref: 'Countries',
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true,  
    },

})

// getting an auto increment id
AirLinesSchema.plugin(AutoIncrement, {inc_field: 'airline_id'});


// remove all the flight connected to the airline
AirLinesSchema.pre('findOneAndRemove',async function(next) {
    
    // get the current airline details
    const current_airline = await this.model.findOne(this.getQuery())
    const id = current_airline._id
    await Flight.deleteMany({airline_company: id})
    next();
});


// // serializer for customer
AirLinesSchema.methods.AirlineSerializer = function(){
    return {id:this.airline_id,
            name:this.name,
            country: this.country.name,
            user: this.user.username}
}

module.exports = mongoose.model('Airlines',AirLinesSchema)