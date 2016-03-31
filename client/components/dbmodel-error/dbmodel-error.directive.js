'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('foobotApp')
  .directive('dbmodelError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        element.on('keydown', function() {
          return ngModel.$setValidity('dbmodel', true);
        });
      }
    };
  });
