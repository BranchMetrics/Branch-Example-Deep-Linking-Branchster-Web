'use strict';

angular.module('bmf', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'facebook'
  ])
.config(function ($routeProvider, $locationProvider, FacebookProvider) {
  FacebookProvider.init('348703352001630');
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .otherwise({
    redirectTo: '/'
  });
});
