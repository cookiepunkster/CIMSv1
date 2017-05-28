angular.module("PrescriptionsServices", [])

    .factory("Prescriptions", ["$http", function($http) {

        console.log("Prescriptions Services js file");

        return {

            getAllPrescriptionsForPatient           : function(patientID) {
                return $http.get('/api/getAllPrescriptionsForPatient/' + patientID).then(function(results) {
                    return results.data;
                });
            },

            getPrescription                         : function(prescriptionID) {
                return $http.get('/api/getPrescription/' + prescriptionID).then(function(result) {
                    return result.data;
                });
            },

            addPrescription                         : function(newPrescription) {
                return $http.post('/api/addPrescription', newPrescription).then(function(result) {
                    return result.data;
                });
            },

            updatePrescription                      : function(prescriptionID, updatedPrescription) {
                return $http.put('/api/updatePrescription/' + prescriptionID, updatedPrescription).then(function(result) {
                    return result.data;
                });
            },

            deletePrescription                      : function(prescriptionID) {
                return $http.delete('/api/deletePrescription/' + prescriptionID).then(function(result) {
                    return result.data;
                });
            }

        };

    }]);