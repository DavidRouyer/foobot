'use strict';

angular.module('foobotApp')
  .directive('gauge', function() {
    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, element) {
        var config = liquidFillGaugeDefaultSettings();
        config.waveAnimateTime = 1500;

        var gauge = loadLiquidFillGauge(element[0].id, 0, config);

        scope.$watch('data', function(newVals) {
          return scope.render(newVals);
        }, true);

        scope.render = function(data) {
          if (data) {
            gauge.update(data);
          }
        };
      }
    };
  });
