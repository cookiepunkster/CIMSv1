angular.module("AccountMngtCtrl", [])

    .controller("AccountMngtController", function($scope, $location, Users) {

        $scope.loggedInUser = {};

        // add to user's addresses always
        $scope.addressObject = {
        
            "roomNumber"     : "",
            "mainAddress"    : "",
            "timeSlots"      : [],
            "contactNumber"  : ""
        }

        $scope.timeSlot = "";

        // geting the logged in user
        Users.getLoggedInUser().then(function(results) {
            $scope.loggedInUser = results;
            console.log($scope.loggedInUser);
        });

        $scope.spliceAddress = function(address) {
            var index = $scope.loggedInUser.addresses.indexOf(address);
            if(index != -1)
                $scope.loggedInUser.addresses.splice(index, 1);
        };
    
        $scope.pushAddress = function() {
            console.log($scope.addressObject);
            $scope.loggedInUser.addresses.push($scope.addressObject);
            $scope.addressObject = {
        
                "roomNumber"     : "",
                "mainAddress"    : "",
                "timeSlots"      : [],
                "contactNumber"  : ""
            }
        };

        $scope.spliceTimeslot = function(timeslot) {
            var index = $scope.addressObject.timeSlots.indexOf($scope.timeSlot);
            if(index != -1)
                $scope.addressObject.timeSlots.splice(index, 1);
        };

        $scope.pushTimeslot = function() {
            $scope.addressObject.timeSlots.push($scope.timeSlot);
            $scope.timeSlot = "";
        };
    
        $scope.save = function() {
            Users.updateUser($scope.loggedInUser._id, $scope.loggedInUser).then(function(result) {
                console.log(result);
                $location.path('/');
            });
        };

        $scope.delete = function() {
            User.deleteUser($scope.loggedInUser._id).then(function(result) {
                console.log(result);
                $location.path('/');
            });
        };

    });