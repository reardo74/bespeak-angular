/* services.js */

// don't forget to declare this service module as a dependency in your main app constructor!
angular.module('bespeak.services.api', []).factory('_bspApi', ['$http', '$cacheFactory', '$q', '_bspAlerts', function($http, $cacheFactory, $q, _bspAlerts) {
	var _bspApi = function($http, $cacheFactory) {
		var getObjectById = function(collection, id) {
	    var i=0, len=collection.length;
	    for (; i<len; i++) {
	      if (+collection[i].id == +id) {
	        return collection[i];
	      }
	    }
	    return null;
		}

		var bespeakServer = window._bspConfig.server;
		var bespeakAccount = window._bspConfig.account;
		var cache = $cacheFactory('_bspCache');
		var bespeak_data = {"courses":$q.defer(), "offices":$q.defer(), "course_types":$q.defer()};
		var local_messages = [];
		var promise = $http.jsonp(bespeakServer + 'sites/' + bespeakAccount + '/courses/available.jsonp?callback=JSON_CALLBACK', {cache: true});
			promise.success(function(data, status, headers, config) {
				var fleshOutCourse = function(course, course_types, offices) {
					function localTime(time, timeZoneOffset) {
						var localOffset = new Date(time * 1000);
						localoffset.getTimezoneOffset()*60;
						return new Date(time*1000 + (timeZoneOffset + localOffset) * 1000);
					}

					var course_type = getObjectById(course_types, course.course_type_id);
					var office = getObjectById(offices, course.office_id);
					course.courseName = course_type.name;
					course.cost = course_type.cost;
					course.officeName = office.name;
					course.officeTimeZoneOffset = course.timeZoneOffset;
					course.startDate = localTime(course.start_at, course.officeTimeZoneOffset);
					course.endDate = localTime(course.end_at, course.officeTimeZoneOffset);
					return course;
				}

				var courses = [];
				angular.forEach(data.courses, function(c, index){
				  courses.push(fleshOutCourse(c, data.course_types, data.offices));
				});

				bespeak_data.courses.resolve(courses);
				bespeak_data.offices.resolve(data.offices);
				bespeak_data.course_types.resolve(data.course_types);
		  }).
		  error(function(data, status, headers, config) {
				_bspAlerts.add({type: "error", msg: "Error code " + status + ": when loading course data. Please try again."})

				bespeak_data.courses.reject();
				bespeak_data.offices.reject();
				bespeak_data.course_types.reject();
		  });



		this.courses = function() {
			return bespeak_data.courses.promise;
		};
		this.get_course = function(id) {
			return this.courses().then(
				function(data){
					return getObjectById(data, id);
				}
			);
		}
		this.offices = function() {
			return bespeak_data.offices.promise;
		};
		this.get_office = function(id) {
			return this.offices().then(function(data){ return getObjectById(data, id); });
		}
		this.course_types = function() {
			return bespeak_data.course_types.promise;
		};
		this.get_course_type = function(id) {
			return this.course_types().then(
				function(data) {
					return getObjectById(data, id);
				}
			);
		};
		this.book = function(reservation) {

			function _buildPaymentDetails(reservation) {
				var paymentDetails = { }
				switch(reservation.paymentMethod) {
					case 'cash':
					break;
					case 'credit_card':
						paymentDetails.credit_card_number = reservation.paymentDetails.creditCardNumber;
						paymentDetails.credit_card_expiration_month = reservation.paymentDetails.creditCardExp.split("/")[0];
						paymentDetails.credit_card_expiration_year = reservation.paymentDetails.creditCardExp.split("/")[1];
						paymentDetails.credit_card_ccv = reservation.paymentDetails.creditCardCCV;
					break;
				}
				return paymentDetails;
			}

			return reservation.resolve().then(function(reservation) {
				var payload = {
					email: reservation.email,
			    attendees: reservation.attendees,
			    course_id: reservation.course.id,
					name: reservation.name,
					phone: reservation.phone,
					payment_method: reservation.paymentMethod == 'coupon' ? 'cash' : reservation.paymentMethod,
					coupon: reservation.coupon
			  };

				payload.payment_details = _buildPaymentDetails(reservation);

				var promise = $http.post(bespeakServer + 'bookings.json', payload);
				return promise;
			});
		}
	};
	return new _bspApi($http, $cacheFactory)
}]);
