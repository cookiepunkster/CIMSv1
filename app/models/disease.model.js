var mongoose            = require("mongoose");
var Schema              = mongoose.Schema;

var DiseaseSchema       = new Schema({

    name                : String,
    description         : String

}, {

    collection: "Diseases"

});

module.exports = mongoose.model("Disease", DiseaseSchema);