angular.module("ConsultationsServices", [])

    .factory("Consultations", ["$http", function($http) {

        console.log("Consultations Services js file");

        return {

            getConsultation                 : function(consultationID) {
                return $http.get('/api/getConsultation/' + consultationID).then(function(result) {
                    return result.data;
                });
            },

            getAllConsultationsForPatient   : function(patientID) {
                return $http.get('/api/getAllConsultationsForPatient/' + patientID).then(function(result) {
                    return result.data;
                });
            },

            getLatestConsultation           : function(patientID) {
                return $http.get('/api/getLatestConsultation/' + patientID).then(function(result) {
                    return result.data;
                });
            },

            addConsultation                 : function(newConsultation) {
                return $http.post('/api/addConsultation', newConsultation).then(function(result) {
                    return result.data;
                });
            },

            updateConsultation              : function(consultationID, updatedConsultation) {
                return $http.put('/api/updateConsultation/' + consultationID, updatedConsultation).then(function(result) {
                    return result.data;
                });
            },

            deleteConsultation              : function(consultationID) {
                return $http.delete('/api/deleteConsultation/' + consultationID).then(function(result) {
                    return result.data;
                });
            }

        };

    }]);