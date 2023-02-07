const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const {Schema} = require('mongoose');
const Ticket = require('../models/Tickets')

const CustomerSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'please provide first name'],
        minlength:3, 
    },
    last_name:{
        type:String,
        required:[true,'please provide last name'],
        minlength:3,

    },
    address:{
        type:String,
        required:[true,'please provide address'],
        default: false,     

    },
    phone_no:{
        type:String,
        required:[true,'please provide phone'], 
        default: false,  
        unique:true,  
    },
    credit_card_no:{
        type:String,
        required:[true,'please provide credit card'], 
        default: false,   
        unique:true, 
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true,  
    },

})

// getting an auto increment id
CustomerSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});



// remove all the tickets connected to the flight
CustomerSchema.pre('findOneAndRemove',async function(next) {

    // get the current flight details
    const current_customer = await this.model.findOne(this.getQuery())
    console.log(current_customer)
    // in case there is no customer
    if(current_customer){
        const id = current_customer._id
        await Ticket.deleteMany({customer: id})
    }
    next();
});



// // serializer for customer
CustomerSchema.methods.CustomerSerializer = function(){
    return {id:this.customer_id,
            first_name: this.first_name,
            last_name: this.last_name,
            address: this.address,
            phone_no: this.phone_no,
            credit_card_no: this.credit_card_no,
            user: this.user.username}
}

module.exports = mongoose.model('Customer',CustomerSchema)