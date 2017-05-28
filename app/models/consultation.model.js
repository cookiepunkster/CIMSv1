var mongoose            = require("mongoose");
var Schema              = mongoose.Schema;

var ConsultationSchema  = new Schema({

    patientID           : Schema.Types.ObjectId, // objectID of patient with this Consultation

    dateIssued          : Date,

    diagnoses           : [Schema.Types.ObjectId], // of all objectids of diseases

}, {

    collection: "Consultations"

});

module.exports = mongoose.model("Consultation", ConsultationSchema);