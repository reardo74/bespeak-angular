angular.module('bespeak.schedule',['ui.bootstrap', 'bespeak.services']).controller("ScheduleCtrl", ['$scope', '$q', '$location', '$filter', '_bspApi', '_bspReservation', 
function($scope, $q, $location, $filter, _bspApi, _bspReservation) {
	var filters = { courseName: $location.search()['course-type'], officeName: $location.search()['office']};

	$scope.courses = _bspApi.courses();
	
	$scope.course = _bspReservation.course();
	$scope.form = { course_id: null };
	$scope.submitted = false;
	
	$scope.navigate = function(next, validate) {
		if(!validate ||$scope.schedule.$valid) {
			$location.path(next); 
		} else {
			$scope.submitted = true;
		}
	};
	
	_bspApi.courses().then(function(courses) {
		var reservationCourse = _bspReservation.course();
		if(reservationCourse) {
			reservationCourse.then(function(c) {
				if(c && _bspApi.get_course(c.id)) { $scope.course = reservationCourse; }
			});
		}
		else {
			$scope.course = $filter('filter')(courses, filters)[0];
		}
	});
	
	$scope.course_filter = filters
	$scope.orderProp = 'start_at';
	
	$scope.$watch('course.id', function(newVal, oldVal) { 
			if(newVal && newVal != $scope.form.course_id) {
				$scope.form.course_id = newVal;
			}
		});
		
	$scope.$watch('form.course_id', function(newVal, oldVal) { 
			if(!_bspReservation.course() || newVal != _bspReservation.course().id) {
				_bspReservation.course(_bspApi.get_course(newVal));
				$scope.course = _bspReservation.course();
			}
		});
}]);