module.exports = function(app) {

    var objectId       = require('mongodb').ObjectID;
    var Abstract       = require('../models/abstract.model');

    app.get('/api/getAllAbstractsForPatient/:patientID', function(req, res) {

        var strPatientID = req.params.patientID;

        Abstract.find({
            patientID   : objectId(strPatientID)
        })
            .sort({
                dateIssued : 'descending'
            })
            .exec(function(err, abstracts) {
                if(err) {
                    res.send(err);
                } else {
                    if(!abstracts) {
                        res.send({ "message" : "no abstracts for this patient yet" });
                    } else {
                        res.send(abstracts);
                    };
                };
            })

    });

    app.get('/api/getAbstract/:abstractID', function(req, res) {
        
        var strAbstractID = req.params.abstractID;

        Abstract.findOne({
            _id : objectId(strAbstractID)
        })
            .exec(function(err, abstract) {
                if(err) {
                    res.send(err);
                } else {
                    if(!abstract) {
                        res.send({ "message" : "the abstract is not found" });
                    } else {
                        res.send(abstract);
                    }
                };
            });

    });

    app.post('/api/addAbstract', function(req, res) {
        
        var newAbstract = new Abstract();
        newAbstract.patientID   = objectId(req.body.patientID);
        newAbstract.dateIssued  = new Date();
        newAbstract.content     = req.body.content;

        newAbstract.save(function(err, abstract) {
            if(err) {
                res.send({ "message" : err });
            } else {
                res.send(abstract);
            };
        })

    });

    app.put('/api/updateAbstract/:abstractID', function(req, res) {

        var abstractIDToUpdate = req.params.abstractID;

        Abstract.findOneAndUpdate({
            _id : objectId(abstractIDToUpdate)
        },
        {$set:  {
                    "patientID"     : objectId(req.body.patientID),
                    "dateIssued"    : req.body.dateIssued,
                    "content"       : req.body.content
        }},
        {
            upsert                  : true
        },
        function(err, abstract) {
            if(err) {
                res.send({ "message" : err });
            } else {
                res.send({ "message" : "successfully updated abstract" });
            };
        });

    });

    app.delete('/api/deleteAbstract/:abstractID', function(req, res) {

        var strAbstractIDToDelete = req.params.abstractID;

        Abstract.findOneAndRemove({
            _id : objectId(strAbstractIDToDelete)
        }, function(err, abstract) {
            if(err) {
                res.send({ "message" : err });
            } else {
                res.send({ "message" : "successfully deleted" });
            };
        });       

    });

};