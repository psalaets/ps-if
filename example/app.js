var app = angular.module('app', ['ps.if']);

app.controller('MainController', function($scope) {
  $scope.show = false;

  $scope.toggle = function toggle() {
    $scope.show = !$scope.show;
  };
});

app.directive('expensiveDirective', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: function($scope) {
      console.log('[expensiveDirective] controller running');

      $scope.$on('$destroy', function() {
        console.log('[expensiveDirective] destroying scope');
      });
    },
    template: '<div>This is the expensive directive</div>'
  };
});