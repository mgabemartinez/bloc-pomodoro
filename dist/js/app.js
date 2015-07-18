/// App Config ///
var Pomodoro = angular.module('Pomodoro', ['firebase', 'ui.router']);

Pomodoro.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

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
}]);


/// Call the controller ///
Pomodoro.controller('home.controller', ['$scope', function($scope) {
}]);

Pomodoro.controller('about.controller', ['$scope', function($scope) {
 }]);

Pomodoro.controller('work-timer.controller', ['$scope', '$interval', function($scope, $interval) {

  $scope.startButton = 'START';
  $scope.pauseButton = 'PAUSE';
  $scope.currentSecond = 1499; 
  $scope.timeString = '25:00';
  
  var currentSecond = $scope.currentSecond;
  var timerOn = false;

  $scope.workTimeKeeper = function() {

    if (timerOn === false) {

      timerOn = true;
      $scope.startButton = 'RESET';

      var secondCounter = $interval(function() { 
      
        var minutes = Math.floor(currentSecond / 60);
        var seconds = (currentSecond % 60);
        
        if ( seconds < 10) {
          seconds = ('0' + seconds);
        }

        var timeString = (minutes + ":" + seconds);

        if (currentSecond < 60 ) {
          timeString = (":" + seconds);
        }
      
        if (currentSecond < 1500) {
        }

        if (currentSecond === 0 || timerOn === false) {
          $interval.cancel(secondCounter);
        }


        document.getElementById("workTime").innerHTML = timeString; 
        
        currentSecond--;
      }, 1000); 
    }

    else {
      $scope.startButton = 'START';
      currentSecond = 1500;
      $interval.cancel(secondCounter);
      timerOn = false
    }
  };



 }]);



Pomodoro.directive('start25', function(){
   return {
     templateUrl: '/templates/directives/start25.html', 
     replace: true,
     restrict: 'E'
   };
 });