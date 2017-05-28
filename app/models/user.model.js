var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var UserSchema  = new Schema({

    username: String,
    password: String,
    
    firstName: String,
    middleName: String,
    lastName: String,
    
    sex: String, // just M or F
    
    type: String, // doctor or secretary
    
    ptr: Number, // optiona (only applicable for doctor)
    license: Number,
    
    addresses: [{
        
        roomNumber      : String,
        mainAddress     : String,
        timeSlots       : [String],
        contactNumber   : Number

    }] // array of dr's addresses (only applicable for doctor as well)

}, { 

    collection: "Users"
    
});

module.exports = mongoose.model("User", UserSchema);