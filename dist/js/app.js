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
    console.log('Hey, this is home.controller')
}]);

Pomodoro.controller('about.controller', ['$scope', function($scope) {
    console.log('Hey, this is about.controller')
 }]);

Pomodoro.controller('work-timer.controller', ['$scope', '$interval', function($scope, $interval) {
    console.log('Hey, this is work-timer.controller')

  $scope.startButton = 'START';
  $scope.pauseButton = 'PAUSE';
  $scope.currentSecond = 1500;
  var currentSecond = $scope.currentSecond;
  var timerOn = false;

  $scope.workTimeKeeper = function() {
    console.log('start');
    
    if (timerOn === false) {
      timerOn = true;
      
      var secondCounter = $interval(function() { 
        console.log('again!')
      
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
          console.log('timer is on');
        }

        if (currentSecond === 0 || timerOn === false) {
          clearInterval(secondCounter);
        }

        document.getElementById("workTime").innerHTML = timeString;

        currentSecond--;
      }, 1000); 

  // start clicked
  //   if timer not on then start time keeping
  //   else reset timer and start running
  //     set currentSecond to 1500

 
      // when paused set timerOn to false
    }
    else {
      currentSecond = 1500;
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