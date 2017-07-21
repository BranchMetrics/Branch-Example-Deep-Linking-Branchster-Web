'use strict';

angular.module('bmf')
	.service('utilities', ['$timeout', function ($timeout) {
		this.popup = function(url, popupOptions) {
			var left = (window.innerWidth  - popupOptions.width)  / 2,
			top = (window.innerHeight - popupOptions.height) / 2,
			options = 'status=1' +
				',width='  + popupOptions.width  +
				',height=' + popupOptions.height +
				',top='    + top    +
				',left='   + left;
			if (this.mobileUserAgent) {
				window.location.href = url;
			}
			else {
				window.open(url, popupOptions.name, options);
			}
		};

		this.mobileUserAgent = function() {
			return navigator.userAgent.match(/android|i(os|p(hone|od|ad))/i) ? (navigator.userAgent.match(/android/i) ? 'android' : 'ios') : false;
		};

		// loops through indices for the body and face, between 0 and max
		this.loopIncrement = function(amount, index, max) {
	    	amount = (index === 0 && amount === -1) ? max : amount;
			amount = (index === max && amount === 1) ? -1 * max : amount;
			return amount;
	    };

	    this.linkData = function(scope) {
	    	return {
				'color_index': scope.selectedColorIndex,
				'body_index': scope.selectedBodyIndex,
				'face_index': scope.selectedFaceIndex,
				'monster_name': scope.branchsterName,
				'monster': true,
				'$desktop_url': 'http://cdn.branch.io/branchster-angular/',
				'$og_title': 'My Branchster: ' + scope.branchsterName,
				'$og_description': scope.description,
				'$og_image_url': 'https://s3-us-west-1.amazonaws.com/branchmonsterfactory/' + scope.selectedColorIndex + scope.selectedBodyIndex + scope.selectedFaceIndex + '.png'
			};
		};

		this.resetShows = function(scope) {
	    	scope.showSMS = false;
		    scope.showClipboard = false;
	    };

	    this.getDescription = function(scope) {
			return scope.descriptions[scope.selectedFaceIndex].replace('$name', scope.branchsterName);
		};

		this.flashState = function(scope, state, flashTime) {
			scope[state] = true;
			scope.interfaceWait = false;
    		$timeout(function() {
				scope[state] = false;
			}, flashTime);
		};
	}]);
