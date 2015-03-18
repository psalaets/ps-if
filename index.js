;(function iife(angular) {
  var m = angular.module('ps.if', []);

  m.directive('psIf', function psIf() {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        // expression controling when children are shown
        psIf: '&',
        // expression that evals to how long children can be hidden before
        // considered cool and destroyed
        psCoolDownMillis: '&'
      },
      controller: ['$scope', '$timeout', function($scope, $timeout) {
        // how long children can stay hidden until they're destroyed
        var coolDownMillis = Number($scope.psCoolDownMillis());

        // when set that means cool down timer is running
        var coolDownPromise;

        $scope.$watch('psIf()', function(value) {
          $scope.show = value;

          if (value) {
            warmed();
            cancelCoolDownTimer();
          } else {
            startCoolDownTimer(coolDownMillis);
          }
        });

        // clean up timer when this directive's scope goes away
        $scope.$on('$destroy', cancelCoolDownTimer);

        function startCoolDownTimer(time) {
          coolDownPromise = $timeout(cooled, time);
        }

        function warmed() {
          $scope.useNgShow = true;
        }

        function cooled() {
          $scope.useNgShow = false;
        }

        function cancelCoolDownTimer() {
          if (coolDownPromise) {
            $timeout.cancel(coolDownPromise);
            coolDownPromise = null;
          }
        }
      }],
      template:
      '<div ng-show="show">' +
        '<div ng-if="useNgShow || show">' +
          '<ng-transclude></ng-transclude>' +
        '</div>' +
      '</div>'
    }
  });
})(function findAngular(global) {
  if (typeof exports === 'object' && typeof module === 'object') {
    // value returned by require('angular') wasn't useful until angular 1.3.14
    return global.angular || require('angular');
  } else {
    return global.angular;
  }
}(this));