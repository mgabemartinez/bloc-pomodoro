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

  $scope.workStartButton = 'START WORK';
  $scope.breakStartButton = 'START BREAK';

  $scope.currentSecond = 1500; 
  $scope.breakCurrentSecond = 300;
  
  var currentSecond = $scope.currentSecond;
  var breakCurrentSecond = $scope.breakCurrentSecond;

  $scope.timeString = '25:00';
  
  var workTimerOn = false;
  var breakTimerOn = false;

  $scope.workTimerVisible = true;
  $scope.breakTimerVisible = false;
  $scope.loopResetVisible = false;




  $scope.TimeKeeper = function() {
        

        if (workTimerOn === false) {

          workTimerOn = true;
          
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
              $scope.workStartButton = 'RESET';
            }

            if (currentSecond === 1500) {
              $scope.workStartButton = 'START WORK';
            }

            if (currentSecond === 0 || workTimerOn === false) {
              $interval.cancel(secondCounter);
            }

            if (currentSecond === 0) {
             $scope.breakTimerVisible = true;
             $scope.workTimerVisible = false;
            }

            $("#workTime")[0].innerHTML = timeString; 
            currentSecond--;
            
          }, 1000); 
        }

        else {
          currentSecond = 1500;
          $interval.cancel(secondCounter);
          workTimerOn = false;
        }
      };


  $scope.BreakTimeKeeper = function() {

        if (breakTimerOn === false) {

          breakTimerOn = true;
          
          var breakSecondCounter = $interval(function() { 
            var breakMinutes = Math.floor(breakCurrentSecond / 60);
            var breakSeconds = (breakCurrentSecond % 60);
            
            if (breakSeconds < 10) {
              breakSeconds = ('0' + breakSeconds);
            }

            var breakTimeString = (breakMinutes + ":" + breakSeconds);

            if (breakCurrentSecond < 60 ) {
              breakTimeString = (":" + breakSeconds);
            }
          
            if (breakCurrentSecond < 300) {
              $scope.breakStartButton = 'RESET';
            }

            if (breakCurrentSecond === 300 ) {
              $scope.breakStartButton = 'START';
            }

            if (breakCurrentSecond === 0 || breakTimerOn === false) {
              $interval.cancel(breakSecondCounter);
            }

            if (breakCurrentSecond === 0) {
              workTimerOn === false
              $scope.breakTimerVisible = false;
              $scope.loopResetVisible = true; 

            }

            $("#workTime")[0].innerHTML = breakTimeString; 

            breakCurrentSecond--;
            
          }, 1000); 
        }

        else {
          $scope.breakStartButton = 'START';
          breakCurrentSecond = 300;
          $interval.cancel(breakSecondCounter);
          breakTimerOn = false;
        }
      };

      $scope.loopReset = function() {
        $("#workTime")[0].innerHTML = '25:00'; 
        $scope.workStartButton = 'START WORK';
        $scope.currentSecond = 1500
        $scope.workTimerVisible = true;
        $scope.loopResetVisible = false;
      }


}]);








Pomodoro.directive('start25', function(){
   return {
     templateUrl: '/templates/directives/start25.html', 
     replace: true,
     restrict: 'E'
   };
 });