(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		o.colorChange = function() {
				if (Math.random() > .5) {
				document.getElementById("body").style.background = "blue";
			} else if 
			(Math.random() < .5) {
				document.getElementById("body").style.background = "red";
			}
		}
		
		return o;
	}
})();