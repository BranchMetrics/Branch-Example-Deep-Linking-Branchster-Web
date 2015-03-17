'use strict';

/**
 * @ngdoc service
 * @name branchsterWebApp.utilities
 * @description
 * # utilities
 * Service in the branchsterWebApp.
 */
angular.module('branchsterWebApp')
	.service('utilities', function () {
		this.popup = function(url, popupOptions) {
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
