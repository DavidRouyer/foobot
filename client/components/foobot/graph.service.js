'use strict';

angular.module('foobotApp')
  .factory('Graph', function Graph($resource) {
    return $resource('/api/v2/device/:uuid/datapoint/:start/:end/:sampling/', {
      uuid: '@_uuid',
      start: '@_start',
      end: '@_end',
      sampling: '@_sampling'
    }, {
      get: {
        method: 'GET'
      }
    });
  });
