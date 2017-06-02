module.exports = function(app) {

    var objectId        = require('mongodb').ObjectID;
    var Disease         = require('../models/disease.model')

    app.get('/api/getAllDiseases', function(req, res) {

        Disease.find({})
            .sort({
                name : 'ascending'
            })
            .exec(function(err, diseases) {
                if(err) {
                    res.send(err);
                } else {
                    if(diseases.size == 0) {
                        res.send({ "message" : "No entries yet" });
                    } else {
                        res.status(200).send(diseases);
                    };
                };
            });

    });

    app.get('/api/getDisease/:diseaseID', function(req, res) {

        var strDiseaseId = req.params.diseaseID;

        Disease.findOne({
            _id : objectId(strDiseaseId)
        })
        .exec(function(err, disease) {
            if(err) {
                res.send(err);
            } else {
                if(!disease) {
                    res.send({ "message" : "patient does not exist" });
                } else {
                    res.send(disease);
                }
            };
        });        

    });

    app.post('/api/addDisease', function(req, res) {

        var newDisease          = new Disease();
        newDisease.name         = req.body.name;
        newDisease.description  = req.body.description;

        newDisease.save(function(err, disease) {
            if(err) {
                res.send({ "message" : "Error in saving new patient!" });
            } else {
                if(!disease._id) {
                    res.send({ "message" : "Error in creating a new patient" });
                } else {
                    res.send(disease);
                };
            };
        });
        
    });

    app.put('/api/updateDisease/:diseaseID', function(req, res) {

        Disease.findOneAndUpdate({
            _id : objectId(req.params.diseaseID)
        },
        {$set:  {
                    "name"          : req.body.name,
                    "description"   : req.body.description
               }},
                {
                    upsert              : true
                },
        function(err, disease) {
            if(err) {
                res.send({ "message" : err });
            } else {
                res.send(disease);
            };
        });

    });

    app.delete('/api/deleteDisease/:diseaseID', function(req, res) {

        var strDiseaseIDToDelete = req.params.diseaseID;

        Disease.findOneAndRemove({
            _id : objectId(strDiseaseIDToDelete)
        }, function(err, disease) {
            if(err) {
                res.send({ "message" : "Error in deletion" });
            } else {
                res.send(disease);
            };
        });

    });

};