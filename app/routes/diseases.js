module.exports = function(app) {

    var objectId        = require('mongodb').ObjectID;
    var Disease         = require('../models/disease.model')

    var _saveCSV = function(arr) {
        
        var json2csv = require('json2csv');
        var fs = require('fs');

        var fields = ['_id', 'name', 'description'];

        var csv = json2csv({ data: arr, fields: fields });

        fs.writeFile('diseases.csv', csv, function(err) {
        if (err) throw err;
            console.log('file saved');
        });

    };

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
                        res.send("No entries yet");
                    } else {
                        //_saveCSV(diseases);
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

    app.get('/api/getDiseaseWithName/:diseaseName', function(req, res) {

    });

    app.post('/api/addDisease', function(req, res) {

        var newDisease          = new Disease();
        newDisease.name         = req.body.name;
        newDisease.description  = req.body.description;

        newDisease.save(function(err, disease) {
            if(err) {
                res.send("Error in saving new patient!");
            } else {
                if(!disease._id) {
                    res.send("Error in creating a new patient");
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
                res.send(err);
            } else {
                console.log(disease);
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
                res.send("Error in deletion");
            } else {
                res.send(disease);
                res.status(204);
            };
        });

    });

};