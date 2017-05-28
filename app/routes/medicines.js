module.exports = function(app) {

    var objectId    = require('mongodb').ObjectID;
    var Medicine    = require('../models/medicine.model');

    var _saveCSV = function(arr) {
        
        var json2csv = require('json2csv');
        var fs = require('fs');

        var fields = ['_id', 'genericName', 'brandName', 'dose'];

        var csv = json2csv({ data: arr, fields: fields });

        fs.writeFile('medicines.csv', csv, function(err) {
        if (err) throw err;
            console.log('file saved');
        });

    };

    app.get('/api/saveAllMedicines', function(req, res) {

        Medicine.find({})
            .sort({
                genericName : 'ascending'
            })
            .exec(function(err, medicines) {
                if(err) {
                    res.send(err);
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
                    res.send(err);
                } else {
                    _saveCSV(medicines);
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

    app.get('/api/getMedicineWithName/:medicineName', function(req, res) {

    });

    app.post('/api/addMedicine', function(req, res) {

        var newMedicine             = new Medicine();
        newMedicine.genericName     = req.body.genericName;
        newMedicine.brandName       = req.body.brandName;
        newMedicine.dose            = req.body.dose;
        
        newMedicine.save(function(err, medicine) {
            if(err) {
                res.send("Error in saving new medicine!");
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
                res.send(err);
            } else {
                console.log(medicine);
                res.send("successfully updated medicine");
            };
        });

    });

    app.delete('/api/deleteMedicine/:medicineID', function(req, res) {

        var strMedicineIDToDelete = req.params.medicineID;

        Medicine.findOneAndRemove({
            _id : objectId(strMedicineIDToDelete)
        }, function(err, medicine) {
            if(err) {
                res.send("Error in deletion");
            } else {
                res.send("successfully deleted!");
            };
        });

    });

};