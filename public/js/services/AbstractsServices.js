angular.module("AbstractsServices", [])

    .factory("Abstracts", ["$http", function($http) {

        console.log("Abstracts Services js file");

        return {

            getAbstractsWithPatientID    : function(patientID) {
                return $http.get('/api/getAllAbstractsForPatient/' + patientID).then(function(abstract) {
                    return abstract.data;
                });
            },

            getAbstractWithAbstractID   : function(abstractID) {
                return $http.get('/api/getAbstract/' + abstractID).then(function(abstract) {
                    return abstract.data;
                });
            },

            addAbstract                 : function(newAbstract) {
                return $http.post('/api/addAbstract', newAbstract).then(function(result) {
                    return result.data;
                });
            },

            updateAbstract              : function(abstractID, updatedAbstract) {
                return $http.put('/api/updateAbstract/' + abstractID, updatedAbstract).then(function(result) {
                    return result.data;
                });
            },

            deleteAbstract              : function(abstractID) {
                return $http.delete('/api/deleteAbstract/' + abstractID).then(function(result) {
                    return result.data;
                });
            }

        };

    }]);