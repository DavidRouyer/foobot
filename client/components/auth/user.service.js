'use strict';

angular.module('foobotApp')
  .factory('User', function ($resource) {
    return $resource('/api/v2/user/:id/:controller/', {
      id: '@_id'
    },
    {
      create: {
        method: 'POST',
        params: {
          controller: 'create'
        }
      },
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      }
	  });
  });
