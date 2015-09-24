'use strict';

angular.module('foobotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('devices', {
        url: '/devices/{deviceUuid}',
        templateUrl: 'app/devices/devices.html',
        controller: 'DevicesCtrl'
      });
  });
