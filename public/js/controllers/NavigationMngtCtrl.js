angular.module('NavigationMngtCtrl', [])

    .controller("NavigationMngtController", function($scope, $location) {

        // paths to modules
        $scope.navigateToPatients = function() {
            $location.path('/patientsearch');
        };

        $scope.navigateToMedicines = function() {
            $location.path('/medicinemngt');
        };

        $scope.navigateToDiseases = function() {
            $location.path('/diseasemngt');
        };

    });