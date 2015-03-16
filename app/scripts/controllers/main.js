'use strict';

/**
 * @ngdoc function
 * @name branchsterWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the branchsterWebApp
 */
angular.module('branchsterWebApp')
	.config(function(FacebookProvider) {
		 FacebookProvider.init('348703352001630');
	})
  .controller('MainCtrl', function ($scope, Facebook) {
  	// Step 3
  	// ============================================================

  	// available branchster colors
    $scope.colors = [ '#24A4DD', '#EC6279', '#29B471', '#F69938', '#84268B', '#24CADA', '#FED521', '#9E1623' ];

    // default name
    var defaultName = 'Bingles Jingleheimer';

    // loops through indices for the body and face, between 0 and max
    $scope.loopIncrement = function(amount, index, max) {
    	amount = (index === 0 && amount === -1) ? max : amount;
		amount = (index === max && amount === 1) ? -1 * max : amount;
		return amount;
    };

    // Step 7
    // ============================================================

	$scope.descriptions = [
		'$name is a social butterfly. She’s a loyal friend, ready to give you a piggyback ride at a moments notice or greet you with a face lick and wiggle.',
		'Creative and contagiously happy, $name has boundless energy and an appetite for learning about new things. He is vivacious and popular, and is always ready for the next adventure.',
		'$name prefers to work alone and is impatient with hierarchies and politics.  Although he’s not particularly social, he has a razor sharp wit (and claws), and is actually very fun to be around.',
		'Independent and ferocious, $name experiences life at 100 mph. Not interested in maintaining order, he is a fierce individual who is highly effective, successful, and incredibly powerful.',
		'Peaceful, shy, and easygoing, $name takes things at his own pace and lives moment to moment. She is considerate, pleasant, caring, and introspective. She’s a bit nerdy and quiet -- but that’s why everyone loves him.'
	];

	$scope.getDescription = function() {
		return $scope.descriptions[$scope.selectedFaceIndex].replace('$name', $scope.branchsterName);
	};

	// ============================================================

    // selected branchster on load
    $scope.selectedFaceIndex = 0;
    $scope.selectedBodyIndex = 0;
    $scope.selectedColorIndex = 0;
    $scope.branchsterName = defaultName;
    $scope.description = $scope.getDescription();

    $scope.switchColor = function(color) {
    	$scope.selectedColorIndex = color;
    };

    $scope.incrementFace = function(amount) {
    	$scope.selectedFaceIndex += $scope.loopIncrement(amount, $scope.selectedFaceIndex, 4);
    	$scope.description = $scope.getDescription();
    };

    $scope.incrementBody = function(amount) {
    	$scope.selectedBodyIndex += $scope.loopIncrement(amount, $scope.selectedBodyIndex, 4);
    };

    // Step 5
    // ============================================================

    $scope.showEditor = true;

    $scope.linkData = {
		'color_index': $scope.selectedColorIndex,
		'body_index': $scope.selectedBodyIndex,
		'face_index': $scope.selectedFaceIndex,
		'monster_name': $scope.branchsterName,
		'monster': true,
		'$desktop_url': 'http://cdn.branch.io/branchster-angular/',
		'$og_title': 'My Branchster: ' + $scope.branchsterName,
		'$og_description': $scope.description,
		'$og_image_url': 'https://s3-us-west-1.amazonaws.com/branchmonsterfactory/' + $scope.selectedColorIndex + $scope.selectedBodyIndex + $scope.selectedFaceIndex + '.png'
	};

    $scope.createBranchster = function() {
		$scope.showEditor = false;
		$scope.branchsterName = $scope.branchsterName || defaultName;
		window.branch.banner({
			title: 'Branchsters',
			description: 'Open your Branchster in our mobile app!',
			showDesktop: false,
			icon: 'images/icons/icon3.png'
		}, {
			channel: 'banner',
			feature: 'share',
			tags: [ 'desktop_creator' ],
			data: $scope.linkData
		});
		$scope.makeLink('display');
    };

    $scope.recreateBranchster = function() {
    	$scope.showEditor = true;
    };

    $scope.makeLink = function(channel) {
    	$scope.resetShows();
		window.branch.link({
			channel: channel,
			feature: 'share',
			tags: [ 'desktop_creator' ],
			data: $scope.linkData
		}, function(err, link) {
			if (channel === 'sms') {
				$scope.showSMS = true;
				$scope.smsLink = link;
			} 
			else if (channel === 'display') {
				$scope.displayLink = link;
			}
			else if (channel === 'clipboard') {
				$scope.showClipboard = true;
				$scope.clipboardLink = link;
			}
			else if (channel === 'twitter') {
				$scope.popup(
					'https://twitter.com/intent/tweet?text=Check%20out%20my%20Branchster%20name%20' + $scope.branchsterName + '&url=' + link + '&original_referer=',
					{
						width: 450,
						height: 450,
						name:'twitter',

					}
				);
			}
			else if (channel === 'facebook') {
				$scope.facebookLink = link;
				Facebook.ui({
					method: 'share_open_graph',
					/*jshint camelcase: false */
					action_type: 'og.likes',
					action_properties: JSON.stringify({
						object: link,
					}),
				}, function(response){ console.log(response); });
			}
			$scope.$apply();
		});
    };

    // Step 6
    // ============================================================
    $scope.phone = '';

    // Links
    $scope.smsLink = '';
    $scope.displayLink = '';
    $scope.clipboardLink = '';

    $scope.resetShows = function() {
    	$scope.showSMS = false;
	    $scope.showClipboard = false;
    };

    $scope.sendSMS  =function() {
    	$scope.smsError = false;
    	$scope.smsSending = true;
    	if ($scope.phone) {
    		window.branch.sendSMS(
			$scope.phone,
			{ data: $scope.linkData },
			{
				/*jshint camelcase: false */
				make_new_link: false
			},
			function(err) {
				$scope.smsSending = false;
				if (err) {
					$scope.smsError = true;
				}
				else {
					$scope.showSMSSent = true;
					
					setTimeout(function() {
						$scope.$apply();
						$scope.showSMSSent = false;
					}, 3000);
				}
			});
    	}
    	else {
    		$scope.smsError = true;
    		$scope.smsSending = false;
    		setTimeout(function() {
				$scope.smsError = false;
				$scope.$apply();
			}, 3000);
    	}
    	$scope.$apply();
    };

    // ============================================================

	$scope.onTextClick = function ($event) {
		$event.target.select();
	};

	$scope.popup = function(url, popupOptions) {
		var left   = (window.innerWidth  - popupOptions.width)  / 2,
		top    = (window.innerHeight - popupOptions.height) / 2,
		options   = 'status=1' +
			',width='  + popupOptions.width  +
			',height=' + popupOptions.height +
			',top='    + top    +
			',left='   + left;

		window.open(url, popupOptions.name, options);
	};
});
