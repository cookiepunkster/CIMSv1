angular.module("UsersServices", [])

    .factory("Users", ["$http", function($http) {

        console.log("Users Services js file");

        return {

            getLoggedInUser     : function() {
                return $http.get('/api/getLoggedInUser').then(function(result){
                    return result.data;
                });
            },

            logout              : function() {
                return $http.get('/api/logout').then(function(result) {
                    return result.data;
                });
            },

            findUser            : function(user) {
                return $http.get('/api/findUser/' + user.username + '&' + user.password).then(function(result) {
                    return result.data;
                });
            },

            getUser             : function(userID) {
                return $http.get('/api/user/' + userID).then(function(result) {
                    return result.data;
                });
            },

            createUser          : function(newUser) {
                return $http.post('/api/createUser', newUser).then(function(result) {
                    return result.data;
                });
            },

            updateUser          : function(userID, updatedUser) {
                return $http.put('/api/updateUser/' + userID, updatedUser).then(function(result) {
                    return result.data;
                });
            },

            deleteUser          : function(userID) {
                return $http.delete('/api/deleteUser/' + userID).then(function(result) {
                    return result.data;
                });
            }

        };

    }]);