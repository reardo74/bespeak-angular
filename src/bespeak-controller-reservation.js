angular.module('bespeak.reservation',['ui.bootstrap', 'bespeak.services']).controller("ReservationCtrl", ['$scope', '$location', '$routeParams', '$q', '_bspApi', '_bspReservation', 
function($scope, $location, $routeParams, $q, _bspApi, _bspReservation) {
	$scope.course = _bspApi.get_course($routeParams.courseId);
	$scope.submitted = false;
	
	$q.all([_bspReservation.course(), $scope.course]).then(function(resolveds) {
		var reservationCourse = resolveds[0];
		var scopeCourse = resolveds[1];
		if(scopeCourse) {
			if(!reservationCourse || reservationCourse.id != scopeCourse.id) { _bspReservation.course(scopeCourse); }
		}
		else {
			if(reservationCourse) { $location.path('/reservation/' + reservationCourse.id); }
			else { $scope.error = "This course is no longer available." }
		}
	});
	
	$scope.form = { email: null, attendees: 1 };
	$scope.navigate = function(next, validate) {
		if(next == 'orderPath') { next = window._bspConfig.orderPath; }
		if(!validate ||$scope.reservation.$valid) {	
			$location.path(next);
		} else {
			$scope.submitted = true;
		}
	};
	
	$q.all([_bspReservation.attendees(), _bspReservation.email()]).then(function(resolveds) {
		var attendees = resolveds[0];
		var email = resolveds[1];
		if(attendees) { $scope.form.attendees = attendees; }
		if(email) { $scope.form.email = email; }
	});
	
	$scope.$watch('form.email', function(newVal, oldVal) { 
		if(newVal && newVal != _bspReservation.email()) {
			_bspReservation.email(newVal);
		}
	});
	
	$scope.$watch('form.attendees', function(newVal, oldVal) { 
		if(newVal && newVal != _bspReservation.attendees()) {
			_bspReservation.attendees(newVal);
		}
	});
}]);