angular.module("MainAppRoutes", [])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        
        $routeProvider
        
            .when('/', {
                templateUrl : 'views/UserCtrl.html'
            })

            .when('/navigator', {
                templateUrl : 'views/Navigator.html',
                controller  : 'NavigationMngtController'
            })

            .when('/patientsearch', {//change to patientSearch again
                templateUrl : 'views/PatientSearch.html',
                controller  : 'PatientSearchController'
            })
        
            .when('/patientmngt', {//change to patientManager
                templateUrl : 'views/PatientMngt.html',
                controller  : "PatientMngtController"
            })

            .when('/diseasemngt', {
                templateUrl : 'views/DiseaseMngt.html',
                controller  : 'DiseaseMngtController'
            })

            .when('/medicinemngt', {
                templateUrl : 'views/MedicineMngt.html',
                controller  : 'MedicineMngtController'
            })

            .when('/accountmngt', {
                templateUrl : 'views/AccountMngt.html',
                controller  : 'AccountMngtController'
            })

            .otherwise('/')

        $locationProvider.html5Mode(true);

    }]);