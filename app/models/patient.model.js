var mongoose        = require("mongoose");
var Schema          = mongoose.Schema;

var PatientSchema   = new Schema({

    firstName       : String,
    middleName      : String,
    lastName        : String,

    birthdate       : Date, // or date?? RESEARCH!

    sex             : String, //purely F or M

    address         : String,

    contactNumber   : Number

}, {

    collection: "Patients"

});

module.exports = mongoose.model("Patient", PatientSchema);