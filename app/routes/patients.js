module.exports = function(app) {

    var objectId    = require('mongodb').ObjectID;
    var Patient     = require('../models/patient.model');

    app.get('/api/getAllPatients', function(req, res) {

        Patient.find({})
            .sort({
                lastName : 'ascending'
            })
            .exec(function(err, patients) {
                if(err) {
                    res.send({ "message" : err });
                } else {
                    res.json(patients);
                };
            });

    });

    app.get('/api/getPatient/:patientID', function(req, res) {

        Patient.findOne({
            _id : objectId(req.params.patientID)
        })
        .exec(function(err, patient) {
            if(err) {
                res.send(err);
            } else {
                if(!patient) {
                    res.send({ "message" : "patient does not exist" });
                } else {
                    res.send(patient);
                }
            };
        });

    });

    app.post('/api/createPatient', function(req, res) {
        
        var newPatient              = new Patient();

        newPatient.firstName        = req.body.firstName;
        newPatient.middleName       = req.body.middleName;
        newPatient.lastName         = req.body.lastName;

        newPatient.birthdate        = req.body.birthdate;
        newPatient.sex              = req.body.sex;
        newPatient.address          = req.body.address;
        newPatient.contactNumber    = req.body.contactNumber;

        newPatient.save(function(err, patient) {
            if(err) {
                res.send({ "message" : err });
            } else {
                if(!patient._id) {
                    res.send({ "message" : "error in saving new patient" });
                } else {
                    res.send(patient);
                };
            };
        });

    });

    app.put('/api/updatePatient/:patientID', function(req, res) {

        var updatedPatient = {

            "firstName"             : req.body.firstName,
            "middleName"            : req.body.middleName,
            "lastName"              : req.body.lastName,

            "birthdate"             : new Date(req.body.birthdate).toISOString(),

            "sex"                   : req.body.sex,

            "address"               : req.body.address,

            "contactNumber"         : req.body.contactNumber

        };

        Patient.findOneAndUpdate({
            _id : objectId(req.params.patientID)
        },
        {
            $set: updatedPatient
        },
                {
                    upsert              : true
                },
        function(err, patient) {
            if(err) {
                res.send({ "message" : err });
            } else {
                res.send({ "message" : "successfully updated patient" });
            };
        });

    });

    app.delete('/api/deletePatient/:patientID', function(req, res) {

        // delete every data first, before patient!!!!!!!!!!!!!!
        var strPatientIDToDelete = req.params.patientID;

        Patient.findOneAndRemove({
            _id : objectId(strPatientIDToDelete)
        }, function(err, patient) {
            if(err) {
                res.send({ "message" : "error in deletion" });
            } else {
                res.send(patient);
            };
        });

    });

};