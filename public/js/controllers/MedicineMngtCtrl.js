angular.module("MedicineMngtCtrl", [])

    .controller("MedicineMngtController", function($location, $scope, Medicines) {

        /**
         * Global Variables and Functions
         */

        $scope.text = "Medicine Management";

        $scope.allMedicines = [];

        // booleans for Functions
        $scope.bIsAdding = false;
        $scope.bIsUpdating = false;

        // overall global disease object
        $scope.medicine = {};

        // data initialization
        $scope.initializeData = function() {
            Medicines.getAllMedicines().then(function(results) {
                $scope.allMedicines = results;
            });
        };

        $scope.save = function() {

            if($scope.bIsAdding) {
                Medicines.addMedicine($scope.medicine).then(function(result) {
                    console.log("successfully added");
                });
            };

            if($scope.bIsUpdating) {
                Medicines.updateMedicine($scope.medicine._id, $scope.medicine).then(function(result) {
                    console.log("successfully updated");
                });
            };

            $scope.resetEverything();
            $scope.initializeData();
        };

        $scope.delete = function() {
            Medicines.deleteMedicine($scope.medicine._id).then(function(result) {
                console.log("deleted!");
                $scope.initializeData();
            });
        };

        // function for resetting values
        $scope.resetEverything = function() {
            
            $scope.bIsAdding = false;
            $scope.bIsUpdating = false;

            $scope.medicine = {
                "_id"           : "",
                "genericName"   : "",
                "brandName"     : "",
                "dose"          : ""
            };
        };

        /**
         * adding, update functions
         */
        $scope.toggleAdd = function() {
            // make sure to reset data
            $scope.resetEverything();

            $scope.medicine = {
                "_id"           : "",
                "genericName"   : "",
                "brandName"     : "",
                "dose"          : ""
            };

            $scope.bIsAdding = true;
        };

        $scope.toggleUpdate = function(medicine) {

            $scope.resetEverything();

            // copying data
            $scope.medicine = {
                "_id"           : medicine._id,
                "genericName"   : medicine.genericName,
                "brandName"     : medicine.brandName,
                "dose"          : medicine.dose
            };

            $scope.bIsUpdating = true;
        };

        $scope.toggleDelete = function(medicine) {
            $scope.medicine._id = medicine._id;
        };

        // navigator
        $scope.pathToNavigator = function() {
           $location.path('/navigator');
        };

    });