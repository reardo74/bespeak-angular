/* services.js */

// don't forget to declare this service module as a dependency in your main app constructor!
angular.module('bespeak.services.alerts', ['ui.bootstrap']).factory('_bspAlerts', function($rootScope) {
	var alertService = {alerts: [], pending: []};
	
	alertService.activatePending = function() {
		alertService.alerts = alertService.alerts.concat(alertService.pending);
		alertService.pending = [];
		return alertService.alerts;
	};
	
	alertService.add = function(type, msg) {
		if(typeof type == 'object') {
			msg = type.msg;
			type = type.type;
		}
		var alert = {
			'type': type, 
			'msg': msg, 
			close: function() {
				alertService.closeAlert(this)
			}
		};
		alertService.alerts.push(alert);
		return alert;
	};
	
	alertService.addPending = function(type, msg) {
		if(typeof type == 'object') {
			msg = type.msg;
			type = type.type;
		}
		var alert = {
			'type': type, 
			'msg': msg, 
			close: function() {
				alertService.closeAlert(this)
			}
		};
		alertService.pending.push(alert);
		return alert;
	};
	
	alertService.clear = function() {
		alertService.alerts = [];
	};

	alertService.closeAlert = function(alert) {
		var index = alertService.alerts.indexOf(alert);
		if(index >= 0) {
			alertService.alerts.splice(index, 1);
		}
	};

	return alertService;
}).controller("AlertCtrl", ['$scope', '_bspAlerts', function($scope, _bspAlerts) {
  $scope.alertservice = _bspAlerts;

	$scope.$on('$routeChangeSuccess', function(event, current, previous){ 
		$scope.alertservice.clear();
		$scope.alertservice.activatePending(); 
	});
}]);
