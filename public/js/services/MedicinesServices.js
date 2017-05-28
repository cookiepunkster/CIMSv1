angular.module("MedicinesServices", [])

    .factory("Medicines", ["$http", function($http) {

        console.log("Medicines Services js file");

        return {

            getAllMedicines             : function() {
                return $http.get('/api/getAllMedicines').then(function(results) {
                    return results.data;
                });
            },

            getMedicine                 : function(medicineID) {
                return $http.get('/api/getMedicine/' + medicineID).then(function(result) {
                    return result.data;
                });
            },

            addMedicine                 : function(newMedicine) {
                return $http.post('/api/addMedicine/', newMedicine).then(function(result) {
                    return result.data;
                });
            },

            updateMedicine              : function(medicineID, updatedMedicine) {
                return $http.put('/api/updateMedicine/' + medicineID, updatedMedicine).then(function(result) {
                    return result.data;
                });
            },

            deleteMedicine              : function(medicineID) {
                return $http.delete('/api/deleteMedicine/' + medicineID).then(function(result) {
                    return result.data;
                });
            }

        };

    }]);