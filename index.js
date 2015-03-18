;(function iife() {
  var m = angular.module('ps.warm-toggle', []);

  m.directive('psWarmToggle', function psWarmToggle() {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        // expression controling when children are shown
        psWarmToggle: '&',
        // expression that evals to how long children can be hidden before
        // considered cool and destroyed
        psCoolDownMillis: '&'
      },
      controller: ['$scope', '$timeout', function($scope, $timeout) {
        // how long children can stay hidden until they're destroyed
        var coolDownMillis = Number($scope.psCoolDownMillis());

        // when set that means cool down timer is running
        var coolDownPromise;

        $scope.$watch('psWarmToggle()', function(value) {
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
})(angular);
