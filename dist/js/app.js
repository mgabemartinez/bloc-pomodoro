/// App Config ///

var Pomodoro = angular.module('Pomodoro', ['firebase', 'ui.router']);

app.controller(['$scope,'

  ]) 

Pomodoro.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
 
  $stateProvider.state('home', {
    url: '/',
    controller: 'home.controller',
    templateUrl: '/templates/home.html'
  });
}]);


/// Call the controller ///




