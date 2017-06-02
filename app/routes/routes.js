module.exports = function(app) {

    var path    = require("path");

    app.get('/api/getLoggedInUser', function(req, res) {

        res.status(200).send(req.session.loggedInUser);

    });

    app.get('/api/logout', function(req, res) {

        req.session.destroy();

        if(!req.session) {
            res.send({ "message" : "logged out" });
        } else {
            res.send({ "message" : "still logged in" });
        };

    });

    app.put('/api/setHighlightedPatient', function(req, res) {

        // EDIT THIS, PLEASE!
        req.session.highlightedPatient = {

            "_id"           : req.body._id,

            "firstName"     : req.body.firstName,
            "middleName"    : req.body.middleName,
            "lastName"      : req.body.lastName,

            "birthdate"     : req.body.birthdate,

            "sex"           : req.body.sex,
            
            "address"       : req.body.address,

            "contactNumber" : req.body.contactNumber

        };

        console.log(req.session.highlightedPatient);

        res.send({ "message" : req.session.highlightedPatient });
    });

    app.get('/api/getHighlightedPatient', function(req, res) {

        res.status(200).send(req.session.highlightedPatient);
    
    });

};