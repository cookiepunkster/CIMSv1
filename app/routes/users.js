module.exports = function(app) {

    var objectId    = require('mongodb').ObjectID;
    var User        = require('../models/user.model');

    app.get('/api/dashboard', function(req, res) {

        if(!req.session.loggedInUser) {
            res.status(400).send({ "message" : "not logged in!" });
        };

        res.status(200).send("Welcome to page" + req.session.loggedInUser);

    });

    app.get('/api/findUser/:username&:password', function(req, res) {
        
        var strUsernameGiven = req.params.username;
        var strPasswordGiven = req.params.password;

        User.findOne({
            "username"  :   strUsernameGiven,
            "password"  :   strPasswordGiven
        })
        .exec(function(err, user) {
            if(err) {
                res.send(err);
            } else {
                if(!user) {
                    res.send({"message" : "User does not exist!"});
                } else {
                    console.log("User exists");
                    req.session.loggedInUser = user;
                        
                    res.send(user);
                };
            };
            console.log("hello");
        });             

    });

    app.get('/api/user/:id', function(req, res) {

        User.findOne({
            _id: objectId(req.params.id)
        })
        .exec(function(err, user) {
            if(err) {
                res.send(err);
            } else {
                console.log(user);
                res.send(user);
            };
        });      

    });

    app.post('/api/createUser', function(req, res) {
        // JSON object will be passed

        var newUser = new User();

        newUser.username    = req.body.username;
        newUser.password    = req.body.password;

        newUser.firstName   = req.body.firstName;
        newUser.middleName  = req.body.middleName;
        newUser.lastName    = req.body.lastName;

        newUser.sex         = req.body.sex;

        newUser.type        = req.body.type;

        newUser.ptr         = req.body.ptr;
        newUser.license     = req.body.license;
        newUser.addresses   = req.body.addresses.slice();

        newUser.save(function(err, user) {
            if(err) {
                res.status(401).send("Error!");
            } else {
                if(!user) {
                    res.send({"message" : "Error in signing up!"});
                } else {
                    res.send("User");
                };
            };
        });

    });

    app.put('/api/updateUser/:id', function(req, res) {
        // JSON object with updates

        User.findOneAndUpdate({
           _id : objectId(req.params.id)
        },
        {$set:  { 
                    "username"  : req.body.username,
                    "password"  : req.body.password,

                    "firstName" : req.body.firstName,
                    "middleName": req.body.middleName,
                    "lastName"  : req.body.lastName,

                    "sex"       : req.body.sex,

                    "type"      : req.body.type,
                    "ptr"       : req.body.ptr,
                    "license"   : req.body.license,

                    "addresses" : req.body.addresses.slice()
                }},
                {
                    upsert : true
                },
        function(err, user) {
            if(err) {
                res.send(err);
            } else {
                console.log("updated: " + user);

                /**
                 * NOTICE ME
                 */
                req.session.loggedInUser = user;

                res.send(user);
            };
        });

    });

    app.delete('/api/deleteUser/:userID', function(req, res) {
        var strUserIDToDelete = req.params.userID;

        User.findOneAndRemove({
            _id :   objectId(strUserIDToDelete)
        }, function(err, user) {
            if(err) {
                res.send({ "message" : "error in deletion of user!" });
            } else {
                res.send(user);
                res.status(204);
            };
        });
    });

};