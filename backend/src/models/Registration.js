const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    date : String,
    approved : Boolean,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
   event : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Event'
   } 
});

module.exports = mongoose.model('Registration', RegistrationSchema)