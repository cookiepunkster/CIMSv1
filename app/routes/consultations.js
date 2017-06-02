module.exports = function(app) {

    var objectId            = require('mongodb').ObjectID;
    var Consultation        = require('../models/consultation.model');

    app.get('/api/getConsultation/:consultationID', function(req, res) {

        Consultation.findOne({
            _id : objectId(req.params.consultationID)
        })
            .exec(function(err, consultation) {
                if(err) {
                    res.send({ "message" : err });
                } else {
                    if(!consultation) {
                        res.send({ "message" : "consultation does not exist" });
                    } else {
                        res.send(consultation);
                    };
                };
            })       

    });

    app.get('/api/getAllConsultations', function(req, res) {

        Consultation.find({
            
        })
            .exec(function(err, consultations) {
                if(err) {
                    res.send(err);
                } else {
                    if(consultations.length == 0) {
                        res.send({ "message" : "no consultations in the db yet" });
                    } else {
                        res.send(consultations);
                    };
                };
            });
    });

    app.get('/api/getAllConsultationsForPatient/:patientID', function(req, res) {

        var strPatientID = req.params.patientID;

        Consultation.find({
            patientID   : objectId(strPatientID)
        })
            .sort({
                dateIssued : 'descending'
            })
            .exec(function(err, consultations) {
                if(err) {
                    res.send(err);
                } else {
                    if(consultations.length == 0) {
                        res.send({ "message" : "no consultations for this patient yet" });
                    } else {
                        res.send(consultations);
                    };
                };
            });
    });

    app.get('/api/getLatestConsultation/:patientID', function(req, res) {

        var strPatientID = req.params.patientID;

        Consultation.findOne({
            patientID   : objectId(strPatientID)
        }).sort({
            dateIssued  : -1
        }).exec(function(err, consultation) {
            if(err) {
                res.send(err);
            } else {
                if(consultation == null) {
                    res.send({ "message" : "no consultations for this patient yet" });
                } else {
                    res.send(consultation)
                };
            };
        });

    });

    app.post('/api/addConsultation', function(req, res) {

        var newConsultation = new Consultation();
        newConsultation.patientID           = objectId(req.body.patientID);
        newConsultation.dateIssued          = new Date().toISOString();
        newConsultation.diagnoses           = req.body.diagnoses.slice();

        newConsultation.save(function(err, consultation) {
            if(err) {
                res.send({ "message" : err });
            } else {
                res.send(consultation);
            };
        })
        
    });

    app.put('/api/updateConsultation/:consultationID', function(req, res) {

        var strConsultationIDToUpdate = req.params.consultationID;

        var updatedConsultationDetails = {
            "patientID"                     : objectId(req.body.patientID),
            "dateIssued"                    : req.body.dateIssued,
            "diagnoses"                     : req.body.diagnoses.slice()
        };

        Consultation.findOneAndUpdate({
            _id : objectId(strConsultationIDToUpdate)
        },
        {
            $set: updatedConsultationDetails
        },
        {
            upsert                  : true
        },
        function(err, consultation) {
            if(err) {
                res.send({ "message" : err });
            } else {
                console.log(consultation);
                res.send({ "message" : "consultation updated" });
            };
        });

    });

    app.delete('/api/deleteConsultation/:consultationID', function(req, res) {

        var strConsultationIDToDelete = req.params.consultationID;

        Consultation.findOneAndRemove({
            _id : objectId(strConsultationIDToDelete)
        }, function(err, consultation) {
            if(err) {
                res.send({ "message" : "error in deleting consultation" });
            } else {
                res.send({ "message" : "consultation deleted" });
            };
        });   

    });

};