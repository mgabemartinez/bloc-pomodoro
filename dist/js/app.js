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
  $scope.loopResetButton = 'START ANOTHER WORK SESSION';

  $scope.currentSecond = 4; 
  $scope.breakCurrentSecond = 3;
  
  var currentSecond = $scope.currentSecond;
  var breakCurrentSecond = $scope.breakCurrentSecond;

  $scope.timeString = '25:00';
  
  var workTimerOn = false;
  var breakTimerOn = false;

  $scope.workTimerVisible = true;
  $scope.breakTimerVisible = false;
  $scope.loopResetVisible = false;

  var sessionCounter = 0;




  $scope.TimeKeeper = function() {
        

        if (workTimerOn === false) {
          breakCurrentSecond = 3;
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

            if (currentSecond === 1500) {
                $scope.workStartButton = 'START WORK';
            }

            if (currentSecond < 1500 & currentSecond > 0) {
              $scope.workStartButton = 'RESET';
            }

            if (currentSecond === 0 || workTimerOn === false) {
              $interval.cancel(secondCounter);
            }

            if (currentSecond === 0) {
              sessionCounter = (sessionCounter + 1);
              console.log(sessionCounter);
              $scope.breakStartButton = 'START BREAK';
              $scope.breakTimerVisible = true;
              $scope.workTimerVisible = false;
            }

            $("#workTime")[0].innerHTML = timeString; 
            currentSecond--;
            
          }, 1000); 
        }

        else {
          currentSecond = 4;
          $interval.cancel(secondCounter);
          workTimerOn = false;
        }
      };


  $scope.BreakTimeKeeper = function() {
    $("#workTime")[0].innerHTML = '5:00'; 
        if (breakTimerOn === false) {
          
          currentSecond = 4;
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
          
            if (breakCurrentSecond < 300 && breakCurrentSecond > 0) {
              $scope.breakStartButton = 'RESET';
            }

            if (breakCurrentSecond === 300 ) {
              $scope.breakStartButton = 'START';
            }

            if (breakCurrentSecond === 0 || breakTimerOn === false) {
              $interval.cancel(breakSecondCounter);
            }

            if (breakCurrentSecond === 0) {
              workTimerOn === false;
              $scope.breakTimerVisible = false;
              $scope.loopResetVisible = true; 
            }

            $("#workTime")[0].innerHTML = breakTimeString; 

            breakCurrentSecond--;
            
          }, 1000); 
        }


        else {
          breakCurrentSecond = 3;
          $interval.cancel(breakSecondCounter);
          breakTimerOn = false;
        }
      };

      $scope.loopReset = function() {
        $("#workTime")[0].innerHTML = '25:00'; 
        $scope.workStartButton = 'START WORK';
        $scope.currentSecond = 1500

        workTimerOn = false;
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