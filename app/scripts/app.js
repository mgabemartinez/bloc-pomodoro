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

  $stateProvider.state('about', {
     url: '/about',
     controller: 'about.controller',
     templateUrl: '/templates/about.html'
   });

    $stateProvider.state('work-timer', {
     url: '/work-timer',
     controller: 'work-timer.controller',
     templateUrl: '/templates/work-timer.html'
   });

    $stateProvider.state('break-timer', {
      url: '/break-timer',
      controller: 'break-timer.controller'
      templateUrl: '/templates/break-timer.html',
      
    });
}]);


/// Call the controller ///




