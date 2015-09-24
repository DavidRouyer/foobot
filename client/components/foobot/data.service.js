'use strict';

angular.module('foobotApp')
  .factory('Data', function Data($resource) {
    return $resource('/api/v2/device/:uuid/datapoint/:period/last/:sampling/', {
      uuid: '@_uuid',
      period: '@_period',
      sampling: '@_sampling'
    }, {
      get: {
        method: 'GET'
      }
    });
  });
