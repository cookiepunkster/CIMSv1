angular.module("UserCtrl", [])

    .controller("UserController", function($scope, $location, $window, Users) {

        /**
         * Global Variables and Functions
         */

        $scope.text = "User Management";

        // for nav bar purposes
        $scope.loggedInUser = {};
        $scope.loggedIn = false;

        $scope.arrContactNumbers = [];

        // addresses dynamic content
        $scope.address = {};
        $scope.arrAddresses = [];

        // time slot dynamic content
        $scope.strTimeSlot = "";
        $scope.arrTimeSlots = [];

        // main user object
        $scope.user = {};

        // checker of functions
        $scope.bIsUpdating = false;
        $scope.bIsSaving = false;

        /**
         * error handling in entries in sign in and sign up
         */
        
        $scope.bErrorInSigningUp = false;
        $scope.bPasswordNotMatching = false;
        $scope.bNoUser = false;

        $scope._resetBools = function() {
            $scope.bIsUpdating = false;
            $scope.bIsSaving = false;
        };

        $scope.initializeUser = function() {
            
            Users.getLoggedInUser().then(function(result) {
                if(result.username) {
                    $scope.loggedInUser = result;
                    $scope.loggedIn = true;

                    console.log("from initializeUser: " + result.username);

                    $location.path('/navigator');
                };
            });
        };

        $scope.signIn = function(signInInfo) {

            Users.findUser(signInInfo).then(function(result) {
                
                if(!result.username) {

                    $scope.bNoUser = true;

                } else if(result.username) {

                    $scope.bNoUser = false;
                    $scope.initializeUser();
                }; 
            });
        };

        $scope._toggleUpdate = function() {
            
            $scope.bIsUpdating = true;
            $scope.user = { 
                    "_id"       : $scope.loggedInUser._id,

                    "username"  : $scope.loggedInUser.username,
                    "password"  : $scope.loggedInUser.password,

                    "firstName" : $scope.loggedInUser.firstName,
                    "middleName": $scope.loggedInUser.middleName,
                    "lastName"  : $scope.loggedInUser.lastName,

                    "sex"       : $scope.loggedInUser.sex,

                    "type"      : $scope.loggedInUser.type,
                    "ptr"       : $scope.loggedInUser.ptr,
                    "license"   : $scope.loggedInUser.license,

                    "addresses" : $scope.loggedInUser.addresses.slice()
                };

            if($scope.user.sex === "F") {
                $scope.user.sex = {};
                $scope.user.sex.F = true;
            } else if($scope.user.sex === "M") {
                $scope.user.sex = {};
                $scope.user.sex.M = true;
            };

            if($scope.user.type === "Doctor") {
                $scope.user.type = {};
                $scope.user.type.Doctor = true;
            } else if($scope.user.type === "Secretary") {
                $scope.user.type = {};
                $scope.user.type.Secretary = true;
            };

            $scope.arrAddresses = $scope.loggedInUser.addresses.slice();

        };

        $scope._toggleAdding = function() {
            $scope.bIsSaving = true;
        };

        /**
         * necessary UI manipulations boolean usage
         */
        
        $scope.togglePasswordError = function() {

            if(!$scope.bPasswordNotMatching) {
                $scope.bPasswordNotMatching = true;
            } else {
                $scope.bPasswordNotMatching = false;
            };
        };

        $scope.toggleSigningUpError = function() {

            if(!$scope.bErrorInSigningUp) {
                $scope.bErrorInSigningUp = true;
            } else {
                $scope.bErrorInSigningUp = false;
            };
        };

        $scope._deleteUser = function() {
            
            Users.logout().then(function(result) {
                Users.deleteUser($scope.loggedInUser._id).then(function(result) {

                    $scope.loggedInUser = {};
                    $scope.loggedIn = false;

                    document.location.href="/";
                });
            });
        };

        // address entry
        $scope.pushAddress = function() {
            $scope.address.timeSlots = $scope.arrTimeSlots.slice();

            // actual pushing
            $scope.arrAddresses.push($scope.address);

            $scope.address = {};
            $scope.arrTimeSlots = [];
        };

        $scope.spliceAddress = function(address) {
            var index = $scope.arrAddresses.indexOf(address);

            if(index != -1)
                $scope.arrAddresses.splice(index, 1);
        };

        $scope.pushTimeSlot = function() {
            $scope.arrTimeSlots.push($scope.strTimeSlot);
            $scope.strTimeSlot = "";
        };

        $scope.spliceTimeSlot = function(timeslot) {
            var index = $scope.arrTimeSlots.indexOf(timeslot);

            if(index != -1)
                $scope.arrTimeSlots.splice(index, 1);
        };

        $scope._saveUser = function() {

            // last, passwords
            if($scope.user.password1 === $scope.user.password2) {
                $scope.user.password = $scope.user.password1;
                $scope.bPasswordNotMatching = false;

                if($scope.user.sex.F)
                    $scope.user.sex = "F";
                else if($scope.user.sex.M)
                    $scope.user.sex = "M";

                if($scope.user.type.Doctor)
                    $scope.user.type = "Doctor";
                else if($scope.user.type.Secretary)
                    $scope.user.type = "Secretary";

            } else if($scope.user.password1 != $scope.user.password2) {
                $scope.bPasswordNotMatching = true;
            };

            if(!$scope.bPasswordNotMatching) {
                $scope.user.addresses = $scope.arrAddresses.slice();

                if($scope.bIsSaving) {

                    Users.createUser($scope.user).then(function(result) {
                        
                        $scope.bPasswordNotMatching = false;
                        $window.location.reload();
                    });

                } else if ($scope.bIsUpdating) {

                    Users.updateUser($scope.user._id, $scope.user).then(function(result) {

                        $scope.bPasswordNotMatching = false;
                        $scope.loggedInUser = result;

                        $scope.initializeUser();
                        $window.location.reload();
                    });
                    
                };

                $scope._resetUser();
                $scope.bIsSaving = false;
                $scope.bIsUpdating = false;
            };
            
        };

        $scope._resetUser = function() {
            $scope.user = {};
            $scope.arrAddresses = [];
        };

        $scope.logout = function() {

            Users.logout().then(function(result) {
                if(result.message === "logged out") {

                    $scope.loggedIn = false;

                    $scope._resetUser();
                    $scope._resetBools();
                    $scope.loggedInUser = {};

                    $location.path('/');

                };
            });
        };

        $scope.pathToMyAccount = function() {
            $location.path('/accountmngt')
        };

    });