'use strict';

angular.module('foobotApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
        .then(function () {
          $scope.message = 'Password successfully changed.';
        })
        .catch(function () {
          form.password.$setValidity('dbmodel', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
