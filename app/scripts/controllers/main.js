'use strict';

/**
 * @ngdoc function
 * @name branchsterWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the branchsterWebApp
 */
angular.module('branchsterWebApp')
  .controller('MainCtrl', function ($scope) {
  	// available branchster colors
    $scope.colors = [ '#24A4DD', '#EC6279', '#29B471', '#F69938', '#84268B', '#24CADA', '#FED521', '#9E1623' ];

    // loops through indices for the body and face, between 0 and max
    $scope.loopIncrement = function(amount, index, max) {
    	amount = (index === 0 && amount === -1) ? max : amount;
		amount = (index === max && amount === 1) ? -1 * max : amount;
		return amount;
    };

    // selected branchster on load
    $scope.selectedFaceIndex = 0;
    $scope.selectedBodyIndex = 0;
    $scope.selectedColorIndex = 0;

    $scope.switchColor = function(color) {
    	$scope.selectedColorIndex = color;
    };

    $scope.incrementFace = function(amount) {
    	$scope.selectedFaceIndex += $scope.loopIncrement(amount, $scope.selectedFaceIndex, 3);
    };

    $scope.incrementBody = function(amount) {
    	$scope.selectedBodyIndex += $scope.loopIncrement(amount, $scope.selectedBodyIndex, 3);
    };
  });
