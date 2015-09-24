'use strict';

angular.module('foobotApp')
  .controller('DevicesCtrl', function ($scope, $http, $state, $stateParams, Data, Graph) {

    Data.get({
      uuid: $stateParams.deviceUuid,
      period: 0,
      sampling: 0
    },
    function (data) {
      for (var i = 0; i < data.sensors.length; i ++) {
        if (data.sensors[i] === 'time') {
          $scope[data.sensors[i]] = moment.unix(data.datapoints[0][i]).fromNow();
        } else {
          $scope[data.sensors[i]] = {};
          $scope[data.sensors[i]].value = data.datapoints[0][i];
          $scope[data.sensors[i]].unit = data.units[i];
        }
      }
    },
    function (err) {
      console.log('Impossible de récupérer les données ' + err);
    });

    Graph.get({
      uuid: $stateParams.deviceUuid,
      start: moment().subtract(7, 'days').toISOString(),
      end: moment().toISOString(),
      sampling: 0
    },
    function(data) {
      $scope.graphData = data.datapoints;
    },
    function (err) {
      console.log('Impossible de récupérer les données ' + err);
    });

  });
