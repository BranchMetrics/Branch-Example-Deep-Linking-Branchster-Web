'use strict';

/**
 * @ngdoc function
 * @name branchsterWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the branchsterWebApp
 */
angular.module('branchsterWebApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
