'use strict';

/**
 * @ngdoc overview
 * @name branchsterWebApp
 * @description
 * # branchsterWebApp
 *
 * Main module of the application.
 */
angular
  .module('branchsterWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
