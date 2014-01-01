angular.module('bespeak.services.reservation', []).service('_bspReservation', ['$q', function($q) {
	var reservation = { 
		course: null, 
		attendees: 1,
		email: null,
		phone: null,
		name: null,
		coupon: null,
		paymentMethod: 'cash',
		paymentDetails: {}
	};
	
	var watchers = {
		'all' : [],
		'course' : [],
		'attendees' : [],
		'email' : [],
		'phone' : [],
		'name' : [],
		'coupon' : [],
		'paymentMethod' : [],
		'paymentDetails' : []
	};
	
	var notify = function(what, newValue, oldValue) {
		angular.forEach(watchers[what].concat(watchers['all']), function (callback) {
			callback(newValue, oldValue);
		});
	};
	
	var service = {
		course: function(value) { 
			if(typeof value !== 'undefined') { 
				var old = reservation.course;
				reservation.course = $q.when(value); 
				notify('course', reservation.course, old);
			} 
			return reservation.course; 
		},
		attendees: function(value) { 
			if(typeof value !== 'undefined') { 
				var old = reservation.attendees;
				reservation.attendees = $q.when(value); 
				notify('attendees', reservation.attendees, old);
			} 
			return reservation.attendees; 
		},
		email: function(value) { 
			if(typeof value !== 'undefined') { 
				var old = reservation.email;
				reservation.email = $q.when(value); 
				notify('email', reservation.email, old);
			} 
			return reservation.email; 
		},
		name: function(value) { 
			if(typeof value !== 'undefined') { 
				var old = reservation.name;
				reservation.name = $q.when(value); 
				notify('name', reservation.name, old);
			} 
			return reservation.name; 
		},
		phone: function(value) { 
			if(typeof value !== 'undefined') { 
				var old = reservation.phone;
				reservation.phone = $q.when(value); 
				notify('phone', reservation.phone, old);
			} 
			return reservation.phone; 
		},
		coupon: function(value) { 
			if(typeof value !== 'undefined') { 
				var old = reservation.coupon;
				reservation.coupon = $q.when(value); 
				notify('coupon', reservation.coupon, old);
			} 
			return reservation.coupon; 
		},
		paymentMethod: function(value) { 
			if(typeof value !== 'undefined') { 
				var old = reservation.paymentMethod;
				reservation.paymentMethod = $q.when(value); 
				notify('paymentMethod', reservation.paymentMethod, old);
			} 
			return reservation.paymentMethod; 
		},
		paymentDetails: function(value) { 
			if(typeof value !== 'undefined') { 
				var old = reservation.paymentDetails;
				reservation.paymentDetails = $q.when(value); 
				notify('paymentDetails', reservation.paymentDetails, old);
			} 
			return reservation.paymentDetails; 
		},
		
		watch: function(what, callback) {
			watchers[what].push(callback);
			return this;
		},
		
		resolve: function() {
			var reservation = {}
			return $q.all([this.course(), this.attendees(), this.email(), this.name(), this.phone(), this.coupon(), this.paymentMethod(), this.paymentDetails()]).then(function(resolveds) {
				reservation = {course: resolveds[0], 
					attendees: resolveds[1],
					email: resolveds[2],
					name: resolveds[3],
					phone: resolveds[4],
					coupon: resolveds[5],
					paymentMethod: resolveds[6],
					paymentDetails: resolveds[7]
				};
				return reservation;
			});
		}
	};
	return service;
}]);