// factory is function(angular, optionalCommonjsModule)
;(function defineModule(global, factory) {
  factory(findAngular(global), findCommonjsModule());

  function findAngular(global) {
    var commonjs = findCommonjsModule();
    if (commonjs) {
      // value returned by require('angular') wasn't useful until angular 1.3.14
      return global.angular || require('angular');
    } else {
      return global.angular;
    }
  }

  // if this seems like commonjs env, return the 'module' global
  function findCommonjsModule() {
    if (typeof exports === 'object' && typeof module === 'object') {
      return module;
    }
  }
})(this, function createAngularModule(angular, commonjsModule) {
  var angularModuleName = 'ps.if';

  // setup so require('ps-if') returns Angular module name when in commonjs environment
  if (commonjsModule) {
    commonjsModule.exports = angularModuleName;
  }

  var angularModule = angular.module(angularModuleName, []);
  angularModule.directive('psIf', ['$timeout', function psIf($timeout) {
    var FOREVER = 'forever';

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
      link: function(scope, element, attrs) {
        // how long children can stay hidden until they're destroyed
        // defaults to forever
        var coolDownMillis = FOREVER;

        if (attrs.psCoolDownMillis) {
          coolDownMillis = Number(scope.psCoolDownMillis());
        }

        // when set that means cool down timer is running
        var coolDownPromise;

        scope.$watch('psIf()', function(value) {
          scope.show = value;

          if (value) {
            warmed();
            cancelCoolDownTimer();
          } else {
            startCoolDownTimer(coolDownMillis);
          }
        });

        // clean up timer when this directive's scope goes away
        scope.$on('$destroy', cancelCoolDownTimer);

        function startCoolDownTimer(time) {
          if (time !== FOREVER) {
            coolDownPromise = $timeout(cooled, time);
          }
        }

        function warmed() {
          scope.useNgShow = true;
        }

        function cooled() {
          scope.useNgShow = false;
        }

        function cancelCoolDownTimer() {
          if (coolDownPromise) {
            $timeout.cancel(coolDownPromise);
            coolDownPromise = null;
          }
        }
      },
      template:
      '<div ng-show="show">' +
        '<div ng-if="useNgShow || show">' +
          '<ng-transclude></ng-transclude>' +
        '</div>' +
      '</div>'
    }
  }]);
});