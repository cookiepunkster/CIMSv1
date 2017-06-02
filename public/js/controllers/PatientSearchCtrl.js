angular.module("PatientSearchCtrl", [])

    .controller("PatientSearchController", function($scope, $location, Patients, Diseases, Consultations, Users) {

        /**
         * GLOBAL VARIABLES AND FUNCTIONS
         */
         $scope.text = "Patient Search";

         $scope.allPatients = [];
         $scope.patient = {};

         // checker for the save function whether the user intends to save or update
         $scope.bIsUpdating = false;

         $scope.bNotAllPrivileges = true;

         var determineUser = function() {
             Users.getLoggedInUser().then(function(result) {
                if(result.type === "Doctor") {
                    $scope.bNotAllPrivileges = false;
                };
             });
         }

         // initialization scheme
         $scope.initializeData = function() {
            Patients.getAllPatients().then(function(results) {
                $scope.allPatients = results;
                determineUser();
            });
         };

         /**
          * data manipulations via UI
          */
         $scope.save = function() {

            // sex manipulation in patient
            if($scope.patient.sex.F) {
                $scope.patient.sex = {};
                $scope.patient.sex = "F";
            } else if ($scope.patient.sex.M) {
                $scope.patient.sex = {};
                $scope.patient.sex = "M";
            } else {
                // if both are selected
            };

            // for adding patient
            if(!$scope.bIsUpdating) {

                Patients.createPatient($scope.patient).then(function() {
                    console.log("finished saving!");
                    $scope.initializeData();
                    $scope.resetPatient();
                });

            // for updating patient
        } else if($scope.bIsUpdating) {
            
                Patients.updatePatient($scope.patient._id, $scope.patient).then(function(result) {
                    console.log(result);

                    $scope.bIsUpdating = false;

                    $scope.initializeData();
                    $scope.resetPatient();
                })

            };
         };

         // patient deletion in database
         $scope.delete = function() {

            Patients.deletePatient($scope.patient._id).then(function(result) {
                console.log("finished deleting!");
                $scope.initializeData();
                $scope.resetPatient();
            });
         };

         // for updating, copy the entry to update first then trigger the boolean value
         $scope.toggleUpdate = function(patient) {
            
            $scope.patient = {

                "_id"           : patient._id,

                "firstName"     : patient.firstName,
                "middleName"    : patient.middleName,
                "lastName"      : patient.lastName,

                "birthdate"     : new Date(patient.birthdate),
                "sex"           : patient.sex,
                "address"       : patient.address,
                "contactNumber" : patient.contactNumber,

                // necessary for this controller
                "sex.F"         : false,
                "sex.M"         : false

            };

            if($scope.patient.sex === "F") {

                $scope.patient.sex = {};
                $scope.patient.sex.F = true;

            } else if($scope.patient.sex === "M") {

                $scope.patient.sex = {};
                $scope.patient.sex.M = true;

            };

            $scope.bIsUpdating = true;

         };

         // in deletion, copy the id of the entry to delete first
         $scope.toggleDelete = function(patient) {
            $scope.patient._id = patient._id;
         };

         // data resetting
         $scope.resetPatient = function() {
             
            $scope.patient = {
                "_id"           : "",

                "firstName"     : "",
                "middleName"    : "",
                "lastName"      : "",

                "birthdate"     : "",
                "address"       : "",
                "contactNumber" : "",

                // necessary for this controller
                "sex.F"         : false,
                "sex.M"         : false
            };
         };

         $scope.processBirthdateForDisplay = function(patient) {
            var newDate = new Date(patient.birthdate);
            patient.birthday = newDate.getUTCMonth()+1 + "/" + newDate.getUTCDate() + "/" + newDate.getUTCFullYear();
         };

         
         // patient highlighting
         $scope.highlightPatient = function(patient) {
            Patients.setHighlightedPatient(patient).then(function(result) {
                $location.path('/patientmngt');
            });
         };

         
         // patient history getter
         $scope.initializePatientData = function(patient) {
            
            Consultations.getLatestConsultation(patient._id).then(function(result) {

                patient.lastDiagnosis = result;

                // when the result has no message attached
                if(!result.message) {

                    patient.lastDiagnosis.arrDiagnoses = [];

                    // get the diagnoses array with it
                    angular.forEach(patient.lastDiagnosis.diagnoses, function(diagnosis) {
                        Diseases.getDisease(diagnosis).then(function(result) {
                            patient.lastDiagnosis.arrDiagnoses.push(result);
                        });
                    });

                };
            });
         };

         // navigator
         $scope.pathToNavigator = function() {
            $location.path('/navigator');
         };

    });