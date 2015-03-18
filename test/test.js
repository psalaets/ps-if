describe('psWarmToggle directive', function () {
  var el, scope, $timeout, $compile;

  beforeEach(module('ps.if'));
  beforeEach(inject(function ($rootScope, _$compile_, _$timeout_) {
    $timeout = _$timeout_;
    $compile = _$compile_;

    el = angular.element(
      '<div ps-if="shouldShow()" ps-cool-down-millis="coolDown()">' +
        '<span>child</span>' +
      '</div>');

    scope = $rootScope.$new();

    scope.shouldShow = function() {
      return scope.show;
    };

    scope.coolDown = function() {
      return 100;
    }
  }));

  ;[true, false].forEach(function(showCondition) {
    describe('show condition starts off as ' + showCondition, function() {
      beforeEach(function() {
        scope.show = showCondition;
        $compile(el)(scope);
      });

      it('has children after: on', function() {
        scope.$apply('show = true');

        expect(el.find('span').length).toBe(1);
      });

      it('has no children after: off', function() {
        scope.$apply('show = false');

        expect(el.find('span').length).toBe(0);
      });

      it('has children after: on, off', function() {
        scope.$apply('show = true');
        scope.$apply('show = false');

        expect(el.find('span').length).toBe(1);
      });

      it('has children after many toggles ending with: on', function() {
        scope.$apply('show = true');
        scope.$apply('show = false');
        scope.$apply('show = true');
        scope.$apply('show = false');
        scope.$apply('show = true');
        scope.$apply('show = false');
        scope.$apply('show = true');

        expect(el.find('span').length).toBe(1);
      });

      it('has children after many toggles ending with: off', function() {
        scope.$apply('show = true');
        scope.$apply('show = false');
        scope.$apply('show = true');
        scope.$apply('show = false');
        scope.$apply('show = true');
        scope.$apply('show = false');

        expect(el.find('span').length).toBe(1);
      });

      it('has no children after: on, off, wait for cool down', function() {
        scope.$apply('show = true');
        scope.$apply('show = false');
        $timeout.flush(200);
        $timeout.verifyNoPendingTasks();

        expect(el.find('span').length).toBe(0);
      });

      it('has children after: on, off, wait for cool down, on', function() {
        scope.$apply('show = true');
        scope.$apply('show = false');
        $timeout.flush(200);
        $timeout.verifyNoPendingTasks();
        scope.$apply('show = true');

        expect(el.find('span').length).toBe(1);
      });
    });
  });
});