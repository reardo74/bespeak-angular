angular.module('bespeak.payment',['ui.bootstrap', 'bespeak.services', 'angularPayments']).controller("PaymentCtrl", ['$scope', '$location', '$q', '_bspApi', '_bspReservation', '_bspAlerts',
function($scope, $location, $q, _bspApi, _bspReservation, _bspAlerts) {
	$scope.course = _bspReservation.course();
	$scope.attendees = _bspReservation.attendees();
	$scope.form = {};
	
	var paymentDetailsCache = {
		creditCardNumber	: "",
		creditCardExp			: "",
		creditCardCCV 		: ""
	};
	
	var creditCardDetails = function(updates, details) {
		details = details || paymentDetailsCache;
		updates = updates || {};
		return {
			creditCardNumber	: updates["creditCardNumber"] || details["creditCardNumber"],
			creditCardExp			: updates["creditCardExp"] || details["creditCardExp"],
			creditCardCCV 		: updates["creditCardCCV"] || details["creditCardCCV"]
		};
	};
	
	$scope.submitted = false;
	$scope.valid = function () {
		return $scope.payment.$valid;
	}
	
	$scope.navigate = function(next, validate) {
		if(!validate || $scope.valid()) {
			$location.path(next);
		} else {
			$scope.submitted = true;
		}
	};
	
	$q.all([_bspReservation.paymentMethod(), _bspReservation.course(), _bspReservation.name(), _bspReservation.phone(), _bspReservation.paymentDetails()]).then(function(resolveds) {
		var paymentMethod = resolveds[0];
		var course = resolveds[1];
		var name = resolveds[2];
		var phone = resolveds[3];
		var paymentDetails = resolveds[4];
		if(!course) { 
			_bspAlerts.addPending({type:'warning', msg:'Please select your course'});
			$location.path('/'); 
		}
		
		if(paymentMethod) { $scope.form.paymentMethod = paymentMethod; }
		if(name) { $scope.form.name = name; } else { $scope.form.name = ""; }
		if(phone) { $scope.form.phone = phone; } else { $scope.form.phone = ""; }
		if(paymentDetails) { $scope.form.paymentDetails = paymentDetails; paymentDetailsCache = paymentDetails; }
	});
	
	$scope.$watch('form.paymentMethod', function(newVal, oldVal) { 
		if(newVal && newVal != _bspReservation.paymentMethod()) {
			_bspReservation.paymentMethod(newVal);
		}
	});
	
	$scope.$watch('form.name', function(newVal, oldVal) { 
		_bspReservation.name(newVal);
	});
	
	$scope.$watch('form.phone', function(newVal, oldVal) { 
		_bspReservation.phone(newVal);
	});
	
	$scope.$watch('form.paymentDetails.creditCardNumber', function(newVal, oldVal) { 
		_bspReservation.paymentDetails(creditCardDetails({creditCardNumber: newVal}));
	});
	
	$scope.$watch('form.paymentDetails.creditCardExp', function(newVal, oldVal) { 
		_bspReservation.paymentDetails(creditCardDetails({creditCardExp: newVal}));
	});
	
	$scope.$watch('form.paymentDetails.creditCardCCV', function(newVal, oldVal) { 
		_bspReservation.paymentDetails(creditCardDetails({creditCardCCV: newVal}));
	});
	
	
	$scope.book = function() {
		$scope.submitted = true;
		if($scope.valid()) {
			var bookingAlert = _bspAlerts.add({type:'info', msg:'Now reserving your spot, please wait...'});
			_bspApi.book(_bspReservation).then(function(response, status, headers, config) { //success
					bookingAlert.close();
					_bspAlerts.add({type:'success', msg:'Reservation successful!'});
					var newLocation = response.data.confirmation_url;
					window.location = newLocation;
				},
				function(response, status, headers, config) { //error
					bookingAlert.close();
					_bspAlerts.add({type:'error', msg: 'Unable to book course. Please double check your payment details and try again.'});
				}
			);
		}
	}
}]);