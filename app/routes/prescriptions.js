module.exports = function(app) {

    var objectId        = require('mongodb').ObjectID;
    var Prescription    = require('../models/prescription.model');

    app.get('/api/getAllPrescriptionsForPatient/:patientID', function(req, res) {

        var strPatientID = req.params.patientID;

        Prescription.find({
            patientID   : objectId(strPatientID)
        })
        .sort({
                dateIssued : 'descending'
            })
        .exec(function(err, prescriptions) {
            if(err) {
                res.send(err);
            } else {
                if(prescriptions.length == 0) {
                    res.send({ "message" : "no prescriptions found for this patient" });
                } else {
                    res.send(prescriptions);
                };
            };
        })

    });

    app.get('/api/getPrescription/:prescriptionID', function(req, res) {

        var strPrescriptionID = req.params.prescriptionID;

        Prescription.find({
            _id : objectId(strPrescriptionID)
        })
        .exec(function(err, prescription) {
            if(err) {
                res.send(err);
            } else {
                if(!prescription) {
                    res.send({ "message" : "prescription not found" });
                    res.status(404);
                } else {
                    res.send(prescription);
                };
            };
        });

    });

    app.post('/api/addPrescription', function(req, res) {
        console.log(req.body);
        var newPrescription                                     = new Prescription();
        
        newPrescription.patientID                               = objectId(req.body.patientID);
        newPrescription.dateIssued                              = new Date().toISOString();
        
        newPrescription.advices.generalIns                      = req.body.advices.generalIns;
        newPrescription.advices.dietaryIns                      = req.body.advices.dietaryIns;
        newPrescription.advices.activityIns                     = req.body.advices.activityIns;

        newPrescription.prescriptionPerMedicine                 = req.body.prescriptionPerMedicine.slice();

        newPrescription.save(function(err, prescription) {
            if(err) {
                console.log(err);
                res.send({ "error" : err });
            } else {
                if(!prescription._id) {
                    res.send({ "message" : "error in creating a new prescription" });
                } else {
                    res.send(prescription);
                };
            };
        });


    });

    app.put('/api/updatePrescription/:prescriptionID', function(req, res) {

        var updatedPrescription = {
            "patientID"                 : objectId(req.body.patientID),
            "dateIssued"                : req.body.dateIssued,
     
            "advices"                   : {
                "generalIns"            : req.body.advices.generalIns,
                "dietaryIns"            : req.body.advices.dietaryIns,
                "activityIns"           : req.body.advices.activityIns
            },

            "prescriptionPerMedicine"   : req.body.prescriptionPerMedicine.slice()
        };

        Prescription.findOneAndUpdate({
            _id : objectId(req.params.prescriptionID)
        },
        {
            $set: updatedPrescription
        },
                {
                    upsert              : true
                },
        function(err, prescription) {
            if(err) {
                res.send(err);
            } else {
                res.send({ "message" : "successfully updated prescription" });
            };
        });


    });

    app.delete('/api/deletePrescription/:prescriptionID', function(req, res) {

        var strPrescriptionIDToDelete = req.params.prescriptionID;

        Prescription.findOneAndRemove({
            _id : objectId(strPrescriptionIDToDelete)
        }, function(err, prescription) {
            if(err) {
                res.send({ "message" : err });
            } else {
                res.send({ "message" : "successfully deleted prescription" });
            };
        });

    });

};