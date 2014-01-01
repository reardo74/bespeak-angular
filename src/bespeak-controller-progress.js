var bespeakProgress = angular.module('bespeak.progress',['ui.bootstrap', 'bespeak.services']);

bespeakProgress.controller("ProgressCtrl", ['$scope', '$location', '_bspReservation', function($scope, $location, _bspReservation) {
	var reservationPath = '/reservation/';
	var pages = ['/', reservationPath, '/payment']
	$scope.course = _bspReservation.course();
	
	_bspReservation.watch('course', function(newVal, oldVal) { 
		$scope.course = newVal;
	});
	
	$scope.isActive = function(page) {
		var isReservation = ($location.path().substr(0, reservationPath.length).toUpperCase() == reservationPath.toUpperCase());
		return $location.path() && $location.path() == page || (page == reservationPath && isReservation);
	}
	
	$scope.passed = function(page) {
		var currentStep = ($location.path().substr(0, reservationPath.length).toUpperCase() == reservationPath.toUpperCase()) ? 1 : pages.indexOf($location.path());
		return $location.path() && pages.indexOf(page) < currentStep;
	}
	
	$scope.navigate = function(page) {
		$location.path(page);
	}
}]);
