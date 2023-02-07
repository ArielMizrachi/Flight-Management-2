const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcryptjs')
const Customer = require('../models/Customer')
const Airline = require('../models/Airlines')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide name'],
        minlength:3,
        maxlength:50,
        unique:true, 

    },
    password:{
        type:String,
        required:[true,'please provide password'],
        minlength:3,

    },
    // match is just to make sure the email is valid
    email:{
        type:String,
        required:[true,'please provide email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/    
             ,'please provide a valid email'],
        unique:true,     

    },
    is_superuser:{
        type:Boolean,
        required:[true,'please provide email'],
        default: false,     

    },
    is_staff:{
        type:Boolean,
        required:[true,'please provide email'], 
        default: false,   
    },

})

// getting an auto increment id
UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

// before saving to the database do this (use bycrpt to hide the password)
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// remove all the child connected to the user on delete
// this works difrently here then in save and remove!!! (6 hours)
UserSchema.pre('findOneAndRemove',async function(next) {
    
    // get the current user details
    const current_user = await this.model.findOne(this.getQuery())
    const id = current_user._id

    await Customer.findOneAndRemove({user: id})
    await Airline.findOneAndRemove({user: id})
    next();
});

// serializer for user
UserSchema.methods.UserSerializer = function(){
    return {id:this.user_id,
            username: this.username,
            email: this.email,
            is_superuser: this.is_superuser,
            is_staff:this.is_staff}
}

// checking if the password is good (with compare)
UserSchema.methods.ComparePassword = async function(canditate_passowrd){
    const is_match = await bcrypt.compare(canditate_passowrd , this.password)
    return is_match
}

module.exports = mongoose.model('User',UserSchema)