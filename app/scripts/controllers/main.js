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
  	// Step 3
  	// ============================================================

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
    $scope.branchsterName = '';

    $scope.switchColor = function(color) {
    	$scope.selectedColorIndex = color;
    };

    $scope.incrementFace = function(amount) {
    	$scope.selectedFaceIndex += $scope.loopIncrement(amount, $scope.selectedFaceIndex, 3);
    };

    $scope.incrementBody = function(amount) {
    	$scope.selectedBodyIndex += $scope.loopIncrement(amount, $scope.selectedBodyIndex, 3);
    };

    //  Step 5
    // ============================================================

    $scope.showEditor = true;

    $scope.linkData = {
			'$color_index': $scope.selectedColorIndex,
			'$body_index': $scope.selectedBodyIndex,
			'$face_index': $scope.selectedFaceIndex,
			'$monster_name': $scope.branchsterName,
			'$og_title': 'My Branchster: ' + $scope.branchsterName,
			'$og_image_url': 'https://s3-us-west-1.amazonaws.com/branchmonsterfactory/' + $scope.selectedColorIndex + $scope.selectedBodyIndex + $scope.selectedFaceIndex + '.png'
		};

    $scope.createBranchster = function() {
		$scope.showEditor = false;
		window.branch.banner({
			title: 'Branchsters',
			description: 'Open your Branchster in our mobile app!',
			icon: 'images/icons/icon3.png'
		}, {
			channel: 'banner',
			data: $scope.linkData
		});
    };

    $scope.recreateBranchster = function() {
    	$scope.showEditor = true;
    };

    $scope.makeLink = function(channel) {
		window.branch.link({
			channel: channel,
			data: $scope.linkData
		}, function(err, link) {
			console.log(err, link);
		});
    };
});
