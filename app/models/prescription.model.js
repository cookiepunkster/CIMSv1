var mongoose            = require("mongoose");
var Schema              = mongoose.Schema;

var PrescriptionSchema  = new Schema({

    patientID           : Schema.Types.ObjectId, // objectId of patient who owns this prescription
    dateIssued          : Date,

    advices             : {
        generalIns      : String,
        dietaryIns      : String,
        activityIns     : String
    },

    prescriptionPerMedicine : [{
        medicine        : Schema.Types.ObjectId, // objectid of medicine prescribed
        quantity        : Number,
        instruction     : String
    }]

}, {

    collection: "Prescriptions"

});

module.exports = mongoose.model("Prescription", PrescriptionSchema);