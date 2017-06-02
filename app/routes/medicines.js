module.exports = function(app) {

    var objectId    = require('mongodb').ObjectID;
    var Medicine    = require('../models/medicine.model');

    app.get('/api/saveAllMedicines', function(req, res) {

        Medicine.find({})
            .sort({
                genericName : 'ascending'
            })
            .exec(function(err, medicines) {
                if(err) {
                    res.send({ "message" : err });
                } else {   
                    res.json(medicines);
                };
            });

    });

    app.get('/api/getAllMedicines', function(req, res) {

        Medicine.find({})
            .sort({
                genericName : 'ascending'
            })
            .exec(function(err, medicines) {
                if(err) {
                    res.send({ "message" : err});
                } else {
                    res.json(medicines);
                };
            });

    });

    app.get('/api/getMedicine/:medicineID', function(req, res) {

        Medicine.findOne({
            _id : objectId(req.params.medicineID)
        })
            .exec(function(err, medicine) {
                if(err) {
                    res.send(err);
                } else {
                    if(!medicine) {
                        res.send({ "message" : "medicine does not exist" });
                    } else {
                        res.send(medicine);
                    };
                };
            })

    });

    app.post('/api/addMedicine', function(req, res) {

        var newMedicine             = new Medicine();
        newMedicine.genericName     = req.body.genericName;
        newMedicine.brandName       = req.body.brandName;
        newMedicine.dose            = req.body.dose;
        
        newMedicine.save(function(err, medicine) {
            if(err) {
                res.send({ "message" : "Error in saving new medicine!" });
            } else {
                res.send(medicine);
            };
        });

    });

    app.put('/api/updateMedicine/:medicineID', function(req, res) {

        var medicineToUpdate = req.params.medicineID;

        Medicine.findOneAndUpdate({
            _id : objectId(medicineToUpdate)
        },
        {$set:  {
                    "genericName"   : req.body.genericName,
                    "brandName"     : req.body.brandName,
                    "dose"          : req.body.dose
        }},
        {
            upsert                  : true
        },
        function(err, medicine) {
            if(err) {
                res.send({ "message" : err });
            } else {
                res.send({ "message" : "successfully updated medicine" });
            };
        });

    });

    app.delete('/api/deleteMedicine/:medicineID', function(req, res) {

        var strMedicineIDToDelete = req.params.medicineID;

        Medicine.findOneAndRemove({
            _id : objectId(strMedicineIDToDelete)
        }, function(err, medicine) {
            if(err) {
                res.send({ "message" : "Error in deletion" });
            } else {
                res.send({ "message" : "successfully deleted" });
            };
        });

    });

};