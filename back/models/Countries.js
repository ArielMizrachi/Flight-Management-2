const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Airlines = require('../models/Airlines')
const Flights = require('../models/Flights')


const CountriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide name'],
        unique:true, 

    },
    flag:{
        type:String,
        required:[true,'please provide flag'],
        minlength:3,
        default:'something',

    },
 
})

// getting an auto increment id
CountriesSchema.plugin(AutoIncrement, {inc_field: 'country_id'});


// remove all the airlines and flights connected to the country
CountriesSchema.pre('findOneAndRemove',async function(next) {

    // get the current flight details
    const current_country = await this.model.findOne(this.getQuery())    
    const id = current_country._id
    await Airlines.deleteMany({country: id})
    await Flights.deleteMany({origin_country: id})
    await Flights.deleteMany({destenation_country: id})

    next();
});



// serializer for country
CountriesSchema.methods.CountriesSerializer = function(){
    return {id:this.country_id,
            name: this.name,
            flag: this.flag}

}


module.exports = mongoose.model('Countries',CountriesSchema)