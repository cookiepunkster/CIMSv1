angular.module("PatientsServices", [])

    .factory("Patients", ["$http", function($http, Consultations, Abstracts, Prescriptions) {

        console.log("Patients Services js file");

        return {

            getAllPatients          : function() {
                return $http.get('/api/getAllPatients').then(function(results) {
                    return results.data;
                });
            },

            getPatient              : function(patientID) {
                return $http.get('/api/getPatient/' + patientID).then(function(result) {
                    return result.data;
                });
            },

            createPatient           : function(newPatient) {
                return $http.post('/api/createPatient', newPatient).then(function(result) {
                    return result.data;
                });
            },

            updatePatient           : function(patientID, updatedPatient) {
                return $http.put('/api/updatePatient/' + patientID, updatedPatient).then(function(result) {
                    return result.data;
                });
            },
            
            deletePatient           : function(patientID) {
                return $http.delete('/api/deletePatient/' + patientID).then(function(result) {
                    return result.data;
                })
            },

            setHighlightedPatient     : function(patient) {
                return $http.put('/api/setHighlightedPatient', patient).then(function(result) {
                    return result.data;
                });
            },

            getHighlightedPatient   : function() {
                return $http.get('/api/getHighlightedPatient').then(function(result) {
                    return result.data;
                });
            }
 
        };

    }]);