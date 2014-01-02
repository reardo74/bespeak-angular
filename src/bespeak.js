var bespeak = angular.module('bespeak',['ui.bootstrap', 'bespeak.services', 'bespeak.progress', 'bespeak.schedule', 'bespeak.reservation', 'bespeak.payment']);

bespeak.config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode(false);
}]);

bespeak.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when(window._bspConfig.orderPath, {templateUrl: "templates/book", controller: "ScheduleCtrl"}).
		when('/reservation/:courseId', {templateUrl: "templates/reservation", controller: "ReservationCtrl"}).
		when('/payment', {templateUrl: "templates/payment", controller: "PaymentCtrl"}).
		otherwise({redirect_to: "fukenhel"});
}]);


bespeak.filter('course', ['$filter', function($filter) { 
	return function(course, format) {
		var start = $filter('date')(course.startDate, 'EEEE M/d/yy @ h:mm a');
		var end = $filter('date')(course.startDate, 'EEEE M/d/yy @ h:mm a');
		var office = course.officeName;
		var name = course.courseName;
		
		var result = format.replace('NAME', name).replace('START', start).replace('OFFICE', office).replace('END', end);
		
		return result;
	};
}]);


