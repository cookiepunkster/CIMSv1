angular.module("DiseasesServices", [])

    .factory("Diseases", ["$http", function($http) {

        console.log("Diseases Services js file");

        return {

            getAllDiseases          : function() {
                return $http.get('/api/getAllDiseases').then(function(results) {
                    return results.data;
                });
            }, 

            getDisease              : function(diseaseID) {
                return $http.get('/api/getDisease/' + diseaseID).then(function(result) {
                    return result.data;
                });
            },

            addDisease              : function(newDisease) {
                return $http.post('/api/addDisease',  newDisease).then(function(result) {
                    return result.data;
                });
            },

            updateDisease           : function(diseaseID, updatedDisease) {
                return $http.put('/api/updateDisease/' +  diseaseID, updatedDisease).then(function(result) {
                    return result.data;
                });
            },

            deleteDisease           : function(diseaseID) {
                return $http.delete('/api/deleteDisease/' + diseaseID).then(function(result) {
                    return result.data;
                });
            },

        };

    }]);