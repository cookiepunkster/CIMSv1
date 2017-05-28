var mongoose            = require("mongoose");
var Schema              = mongoose.Schema;

var MedicineSchema  = new Schema({

    genericName         : String,
    brandName           : String,
    dose                : String

}, {

    collection: "Medicines"

});

module.exports = mongoose.model("Medicine", MedicineSchema);