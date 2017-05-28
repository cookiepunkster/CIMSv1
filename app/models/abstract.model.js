var mongoose            = require("mongoose");
var Schema              = mongoose.Schema;

var AbstractSchema      = new Schema({

    patientID           : Schema.Types.ObjectId, 

    dateIssued          : Date,

    content             : String

}, {

    collection: "Abstracts"

});

module.exports = mongoose.model("Abstracts", AbstractSchema);