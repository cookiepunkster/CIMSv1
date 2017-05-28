angular.module("DiseaseMngtCtrl", [])

    .controller("DiseaseMngtController", function($scope, $location, Diseases) {

        /**
         * Global Variables and Functions
         */
        $scope.allDiseases = [];

        // booleans for Functions
        $scope.bIsAdding = false;
        $scope.bIsUpdating = false;

        // overall global disease object
        $scope.disease = {};

        // data initialization
        $scope.initializeData = function() {
            Diseases.getAllDiseases().then(function(results) {
                $scope.allDiseases = results;
            });
        };

        $scope.save = function() {

            if($scope.bIsAdding) {
                Diseases.addDisease($scope.disease).then(function(result) {
                    console.log("successfully added");
                });
            };

            if($scope.bIsUpdating) {
                Diseases.updateDisease($scope.disease._id, $scope.disease).then(function(result) {
                    console.log("successfully updated");
                });
            };

            $scope.resetEverything();
            $scope.initializeData();
        };

        $scope.delete = function() {
            Diseases.deleteDisease($scope.disease._id).then(function(result) {
                console.log("deleted!");
                $scope.initializeData();
            });
        };

        // function for resetting values
        $scope.resetEverything = function() {
            console.log("restting everything");
            $scope.bIsAdding = false;
            $scope.bIsUpdating = false;

            $scope.disease = {
                "_id"           : "",
                "name"          : "",
                "description"   : ""
            };
        };

        /**
         * adding, update functions
         */
        $scope.toggleAdd = function() {
            // make sure to reset data

            $scope.resetEverything();

            $scope.disease = {
                "_id"           : "",
                "name"          : "",
                "description"   : ""
            };

            $scope.bIsAdding = true;
        };

        $scope.toggleUpdate = function(disease) {
            $scope.resetEverything();

            // copying data
            $scope.disease = {
                "_id"           : disease._id,
                "name"          : disease.name,
                "description"   : disease.description
            };

            $scope.bIsUpdating = true;
        };

        $scope.toggleDelete = function(disease) {
            $scope.disease._id = disease._id;
        };

        // navigator
        $scope.pathToNavigator = function() {
           $location.path('/navigator');
        };
 
    });
