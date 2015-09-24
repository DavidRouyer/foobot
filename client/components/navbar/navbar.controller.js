'use strict';

angular.module('foobotApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Device, gettextCatalog) {
    $scope.menu = [{
      'title': gettextCatalog.getString('Home'),
      'link': '/'
    }];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    if($scope.isLoggedIn()) {
      Device.getDevices({
        id: $scope.getCurrentUser().name
      }, function(data) {
        for (var i = 0; i < data.length; i ++) {
          $scope.menu.push({
            'title': data[i].name,
            'link': '/devices/' + data[i].uuid
          });
        }
      }, function(err) {
        console.log(err);
      });
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
