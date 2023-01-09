const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);


const CountriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide name'],
        unique:true, 

    },
    flag:{
        type:String,
        required:[true,'please provide password'],
        minlength:3,
        default:'something',

    },
 
})

// getting an auto increment id
CountriesSchema.plugin(AutoIncrement, {inc_field: 'country_id'});



// serializer for country
CountriesSchema.methods.CountriesSerializer = function(){
    return {id:this.country_id,
            username: this.username,
            name: this.name,
            flag: this.flag}
}


module.exports = mongoose.model('Countries',CountriesSchema)