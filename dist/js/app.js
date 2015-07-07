var app = angular.module('Pomodoro', ['firebase', 'ui.router']);

app.controller(['$scope,'

  ]) 

Pomodoro.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
 
   $stateProvider.state('landing', {
     url: '/',
     controller: 'Landing.controller',
     templateUrl: '/templates/landing.html'
   });
 }]);

Pomodoro.controller('Landing.controller', ['$scope', function($scope) {