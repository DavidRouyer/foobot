'use strict';

angular.module('foobotApp')
  .factory('Device', function Device($resource) {
    return $resource('/api/v2/owner/:id/device/', {
      id: '@_id'
    }, {
      getDevices: {
        method: 'GET',
        isArray: true
      }
    });
  });
