'use strict';

angular.module('foobotApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser.name = localStorage.getItem('username');
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/v2/user/' + user.email + '/login/', {
          headers: {
            Authorization: 'Basic ' + window.btoa(unescape(encodeURIComponent(user.email + ':' + user.password)))
          }
        }).
        success(function (data, status, headers) {
          if (!data) {
            deferred.reject({ message: 'Unable to log in.' });
          } else {
            $cookieStore.put('token', headers('X-AUTH-TOKEN'));
            user.name = user.email;
            localStorage.setItem('username', user.name);
            currentUser = user;
            deferred.resolve(data);
            return cb();
          }
        }).
        error(function (err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function () {
        $cookieStore.remove('token');
        localStorage.removeItem('username');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function (user, callback) {
        var cb = callback || angular.noop;

        user.id = user.email;
        return User.create(user,
          function (data, headers) {
            $cookieStore.put('token', headers('X-AUTH-TOKEN'));
            currentUser.name = data.username;
            localStorage.setItem('username', currentUser.name);
            currentUser = data;
            return cb(user);
          },
          function (err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser.id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function (user) {
          return cb(user);
        }, function (err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function () {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return currentUser.hasOwnProperty('name');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function (cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('name')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function () {
        return currentUser.permission === 'ROLE_ADMIN';
      },

      /**
       * Get auth token
       */
      getToken: function () {
        return $cookieStore.get('token');
      }
    };
  });
