angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.transition","ui.bootstrap.progressbar","ui.bootstrap.timepicker"]),angular.module("ui.bootstrap.tpls",["template/alert/alert.html","template/progressbar/bar.html","template/progressbar/progress.html","template/timepicker/timepicker.html"]),angular.module("ui.bootstrap.alert",[]).directive("alert",function(){return{restrict:"EA",templateUrl:"template/alert/alert.html",transclude:!0,replace:!0,scope:{type:"=",close:"&"},link:function(a,b,c){a.closeable="close"in c}}}),angular.module("ui.bootstrap.buttons",[]).constant("buttonConfig",{activeClass:"active",toggleEvent:"click"}).directive("btnRadio",["buttonConfig",function(a){var b=a.activeClass||"active",c=a.toggleEvent||"click";return{require:"ngModel",link:function(a,d,e,f){f.$render=function(){d.toggleClass(b,angular.equals(f.$modelValue,a.$eval(e.btnRadio)))},d.bind(c,function(){d.hasClass(b)||a.$apply(function(){f.$setViewValue(a.$eval(e.btnRadio)),f.$render()})})}}}]).directive("btnCheckbox",["buttonConfig",function(a){var b=a.activeClass||"active",c=a.toggleEvent||"click";return{require:"ngModel",link:function(a,d,e,f){var g=a.$eval(e.btnCheckboxTrue),h=a.$eval(e.btnCheckboxFalse);g=angular.isDefined(g)?g:!0,h=angular.isDefined(h)?h:!1,f.$render=function(){d.toggleClass(b,angular.equals(f.$modelValue,g))},d.bind(c,function(){a.$apply(function(){f.$setViewValue(d.hasClass(b)?h:g),f.$render()})})}}}]),angular.module("ui.bootstrap.transition",[]).factory("$transition",["$q","$timeout","$rootScope",function(a,b,c){function d(a){for(var b in a)if(void 0!==f.style[b])return a[b]}var e=function(d,f,g){g=g||{};var h=a.defer(),i=e[g.animation?"animationEndEventName":"transitionEndEventName"],j=function(){c.$apply(function(){d.unbind(i,j),h.resolve(d)})};return i&&d.bind(i,j),b(function(){angular.isString(f)?d.addClass(f):angular.isFunction(f)?f(d):angular.isObject(f)&&d.css(f),i||h.resolve(d)}),h.promise.cancel=function(){i&&d.unbind(i,j),h.reject("Transition cancelled")},h.promise},f=document.createElement("trans"),g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},h={WebkitTransition:"webkitAnimationEnd",MozTransition:"animationend",OTransition:"oAnimationEnd",transition:"animationend"};return e.transitionEndEventName=d(g),e.animationEndEventName=d(h),e}]),angular.module("ui.bootstrap.progressbar",["ui.bootstrap.transition"]).constant("progressConfig",{animate:!0,autoType:!1,stackedTypes:["success","info","warning","danger"]}).controller("ProgressBarController",["$scope","$attrs","progressConfig",function(a,b,c){function d(a){return g[a]}var e=angular.isDefined(b.animate)?a.$eval(b.animate):c.animate,f=angular.isDefined(b.autoType)?a.$eval(b.autoType):c.autoType,g=angular.isDefined(b.stackedTypes)?a.$eval("["+b.stackedTypes+"]"):c.stackedTypes;this.makeBar=function(a,b,c){var g=angular.isObject(a)?a.value:a||0,h=angular.isObject(b)?b.value:b||0,i=angular.isObject(a)&&angular.isDefined(a.type)?a.type:f?d(c||0):null;return{from:h,to:g,type:i,animate:e}},this.addBar=function(b){a.bars.push(b),a.totalPercent+=b.to},this.clearBars=function(){a.bars=[],a.totalPercent=0},this.clearBars()}]).directive("progress",function(){return{restrict:"EA",replace:!0,controller:"ProgressBarController",scope:{value:"=percent",onFull:"&",onEmpty:"&"},templateUrl:"template/progressbar/progress.html",link:function(a,b,c,d){a.$watch("value",function(a,b){if(d.clearBars(),angular.isArray(a))for(var c=0,e=a.length;e>c;c++)d.addBar(d.makeBar(a[c],b[c],c));else d.addBar(d.makeBar(a,b))},!0),a.$watch("totalPercent",function(b){b>=100?a.onFull():0>=b&&a.onEmpty()},!0)}}}).directive("progressbar",["$transition",function(a){return{restrict:"EA",replace:!0,scope:{width:"=",old:"=",type:"=",animate:"="},templateUrl:"template/progressbar/bar.html",link:function(b,c){b.$watch("width",function(d){b.animate?(c.css("width",b.old+"%"),a(c,{width:d+"%"})):c.css("width",d+"%")})}}}]),angular.module("ui.bootstrap.timepicker",[]).filter("pad",function(){return function(a){return angular.isDefined(a)&&a.toString().length<2&&(a="0"+a),a}}).constant("timepickerConfig",{hourStep:1,minuteStep:1,showMeridian:!0,meridians:["AM","PM"],readonlyInput:!1,mousewheel:!0}).directive("timepicker",["padFilter","$parse","timepickerConfig",function(a,b,c){return{restrict:"EA",require:"ngModel",replace:!0,templateUrl:"template/timepicker/timepicker.html",scope:{model:"=ngModel"},link:function(d,e,f){function g(){var a=parseInt(d.hours,10),b=d.showMeridian?a>0&&13>a:a>=0&&24>a;return b?(d.showMeridian&&(12===a&&(a=0),d.meridian===k[1]&&(a+=12)),a):void 0}function h(){var b=j.getHours();d.showMeridian&&(b=0===b||12===b?12:b%12),d.hours="h"===s?b:a(b),d.validHours=!0;var c=j.getMinutes();d.minutes="m"===s?c:a(c),d.validMinutes=!0,d.meridian=d.showMeridian?j.getHours()<12?k[0]:k[1]:"",s=!1}function i(a){var b=new Date(j.getTime()+6e4*a);b.getDate()!==j.getDate()&&b.setDate(b.getDate()-1),j.setTime(b.getTime()),d.model=new Date(j)}var j=new Date,k=c.meridians,l=c.hourStep;f.hourStep&&d.$parent.$watch(b(f.hourStep),function(a){l=parseInt(a,10)});var m=c.minuteStep;f.minuteStep&&d.$parent.$watch(b(f.minuteStep),function(a){m=parseInt(a,10)}),d.showMeridian=c.showMeridian,f.showMeridian&&d.$parent.$watch(b(f.showMeridian),function(a){if(d.showMeridian=!!a,d.model)h();else{var b=new Date(j),c=g();angular.isDefined(c)&&b.setHours(c),d.model=new Date(b)}});var n=e.find("input"),o=n.eq(0),p=n.eq(1),q=angular.isDefined(f.mousewheel)?d.$eval(f.mousewheel):c.mousewheel;if(q){var r=function(a){return a.originalEvent&&(a=a.originalEvent),a.detail||a.wheelDelta>0};o.bind("mousewheel",function(a){d.$apply(r(a)?d.incrementHours():d.decrementHours()),a.preventDefault()}),p.bind("mousewheel",function(a){d.$apply(r(a)?d.incrementMinutes():d.decrementMinutes()),a.preventDefault()})}var s=!1;d.readonlyInput=angular.isDefined(f.readonlyInput)?d.$eval(f.readonlyInput):c.readonlyInput,d.readonlyInput?(d.updateHours=angular.noop,d.updateMinutes=angular.noop):(d.updateHours=function(){var a=g();angular.isDefined(a)?(s="h",null===d.model&&(d.model=new Date(j)),d.model.setHours(a)):(d.model=null,d.validHours=!1)},o.bind("blur",function(){d.validHours&&d.hours<10&&d.$apply(function(){d.hours=a(d.hours)})}),d.updateMinutes=function(){var a=parseInt(d.minutes,10);a>=0&&60>a?(s="m",null===d.model&&(d.model=new Date(j)),d.model.setMinutes(a)):(d.model=null,d.validMinutes=!1)},p.bind("blur",function(){d.validMinutes&&d.minutes<10&&d.$apply(function(){d.minutes=a(d.minutes)})})),d.$watch(function(){return+d.model},function(a){!isNaN(a)&&a>0&&(j=new Date(a),h())}),d.incrementHours=function(){i(60*l)},d.decrementHours=function(){i(60*-l)},d.incrementMinutes=function(){i(m)},d.decrementMinutes=function(){i(-m)},d.toggleMeridian=function(){i(720*(j.getHours()<12?1:-1))}}}}]),angular.module("template/alert/alert.html",[]).run(["$templateCache",function(a){a.put("template/alert/alert.html","<div class='alert' ng-class='type && \"alert-\" + type'>\n    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n    <div ng-transclude></div>\n</div>\n")}]),angular.module("template/progressbar/bar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/bar.html",'<div class="bar" ng-class=\'type && "bar-" + type\'></div>')}]),angular.module("template/progressbar/progress.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progress.html",'<div class="progress"><progressbar ng-repeat="bar in bars" width="bar.to" old="bar.from" animate="bar.animate" type="bar.type"></progressbar></div>')}]),angular.module("template/timepicker/timepicker.html",[]).run(["$templateCache",function(a){a.put("template/timepicker/timepicker.html",'<table class="form-inline">\n	<tr class="text-center">\n		<td><a ng-click="incrementHours()" class="btn btn-link"><i class="icon-chevron-up"></i></a></td>\n		<td>&nbsp;</td>\n		<td><a ng-click="incrementMinutes()" class="btn btn-link"><i class="icon-chevron-up"></i></a></td>\n		<td ng-show="showMeridian"></td>\n	</tr>\n	<tr>\n		<td class="control-group" ng-class="{\'error\': !validHours}"><input type="text" ng-model="hours" ng-change="updateHours()" class="span1 text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2" /></td>\n		<td>:</td>\n		<td class="control-group" ng-class="{\'error\': !validMinutes}"><input type="text" ng-model="minutes" ng-change="updateMinutes()" class="span1 text-center" ng-readonly="readonlyInput" maxlength="2"></td>\n		<td ng-show="showMeridian"><button ng-click="toggleMeridian()" class="btn text-center">{{meridian}}</button></td>\n	</tr>\n	<tr class="text-center">\n		<td><a ng-click="decrementHours()" class="btn btn-link"><i class="icon-chevron-down"></i></a></td>\n		<td>&nbsp;</td>\n		<td><a ng-click="decrementMinutes()" class="btn btn-link"><i class="icon-chevron-down"></i></a></td>\n		<td ng-show="showMeridian"></td>\n	</tr>\n</table>')}]);;angular.module('angularPayments', []);angular.module('angularPayments')

.factory('Common', [function(){

  var ret = {};


  // expiry is a string "mm / yy[yy]"
  ret['parseExpiry'] = function(value){
    var month, prefix, year, _ref;

    value = value || ''

    value = value.replace(/\s/g, '');
    _ref = value.split('/', 2), month = _ref[0], year = _ref[1];

    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }

    month = parseInt(month, 10);
    year = parseInt(year, 10);
    
    return {
      month: month,
      year: year
    };
  }

  return ret;

}]);angular.module('angularPayments')

.factory('Cards', [function(){

  var defaultFormat = /(\d{1,4})/g;
  var defaultInputFormat =  /(?:^|\s)(\d{4})$/;

        var cards = [
    {
      type: 'maestro',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      format: defaultFormat,
      inputFormat: defaultInputFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'dinersclub',
      pattern: /^(36|38|30[0-5])/,
      format: defaultFormat,
      inputFormat: defaultInputFormat,
      length: [14],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'laser',
      pattern: /^(6706|6771|6709)/,
      format: defaultFormat,
      inputFormat: defaultInputFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'jcb',
      pattern: /^35/,
      format: defaultFormat,
      inputFormat: defaultInputFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'unionpay',
      pattern: /^62/,
      format: defaultFormat,
      inputFormat: defaultInputFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: false
    }, {
      type: 'discover',
      pattern: /^(6011|65|64[4-9]|622)/,
      format: defaultFormat,
      inputFormat: defaultInputFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'mastercard',
      pattern: /^5[1-5]/,
      format: defaultFormat,
      inputFormat: defaultInputFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'amex',
      pattern: /^3[47]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      inputFormat: /^(\d{4}|\d{4}\s\d{6})$/,
      length: [15],
      cvcLength: [3, 4],
      luhn: true
    }, {
      type: 'visa',
      pattern: /^4/,
      format: defaultFormat,
      inputFormat: defaultInputFormat,
      length: [13, 14, 15, 16],
      cvcLength: [3],
      luhn: true
    }
  ];


  var _fromNumber = function(num){
      var card, i, len;

      num = (num + '').replace(/\D/g, '');

      for (i = 0, len = cards.length; i < len; i++) {

        card = cards[i];

        if (card.pattern.test(num)) {
          return card;
        }

      }
  }

  var _fromType = function(type) {
      var card, i, len;

      for (i = 0, len = cards.length; i < len; i++) {

        card = cards[i];
        
        if (card.type === type) {
          return card;
        }

      }
  };

  return {
      fromNumber: function(val) { return _fromNumber(val) },
      fromType: function(val) { return _fromType(val) },
      defaultFormat: function() { return defaultFormat;},
      defaultInputFormat: function() { return defaultInputFormat;}
  }

}]);angular.module('angularPayments')


.factory('_Format',['Cards', 'Common', '$filter', function(Cards, Common, $filter){

  var _formats = {}

  var _hasTextSelected = function($target) {
      var ref;
      
      if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
          return true;
      }
      
      if (typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? typeof ref.createRange === "function" ? ref.createRange().text : void 0 : void 0 : void 0) {
          return true;
      }
      
      return false;
    };

  // card formatting

  var _formatCardNumber = function(e) {
      var $target, card, digit, length, re, upperLength, value;
      
      digit = String.fromCharCode(e.which);
      $target = angular.element(e.currentTarget);
      value = $target.val();
      card = Cards.fromNumber(value + digit);
      length = (value.replace(/\D/g, '') + digit).length;
      
      upperLength = 16;
      
      if (card) {
        upperLength = card.length[card.length.length - 1];
      }
      
      if (length >= upperLength) {
        return;
      }

      if (!/^\d+$/.test(digit) && !e.meta && e.keyCode >= 46) {
        e.preventDefault();
        return;
      }

      if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
        return;
      }

      re = Cards.defaultInputFormat();
      if (card) {
          re = card.inputFormat;
      }

      if (re.test(value)) {
        e.preventDefault();
        return $target.val(value + ' ' + digit);

      } else if (re.test(value + digit)) {
        e.preventDefault();
        return $target.val(value + digit + ' ');

      }
  };

  var _restrictCardNumber = function(e) {
      var $target, card, digit, value;
      
      $target = angular.element(e.currentTarget);
      digit = String.fromCharCode(e.which);
      
      if(!/^\d+$/.test(digit)) {
        return;
      }
      
      if(_hasTextSelected($target)) {
        return;
      }
      
      value = ($target.val() + digit).replace(/\D/g, '');
      card = Cards.fromNumber(value);
      
      if(card) {
        if(!(value.length <= card.length[card.length.length - 1])){
          e.preventDefault();
        }
      } else {
        if(!(value.length <= 16)){
          e.preventDefault();
        }
      }
  };

  var _formatBackCardNumber = function(e) {
      var $target, value;
      
      $target = angular.element(e.currentTarget);
      value = $target.val();
      
      if(e.meta) {
        return;
      }
      
      if(e.which !== 8) {
        return;
      }
      
      if(($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
        return;
      }
      
      if(/\d\s$/.test(value) && !e.meta && e.keyCode >= 46) {
        e.preventDefault();
        return $target.val(value.replace(/\d\s$/, ''));
      } else if (/\s\d?$/.test(value)) {
        e.preventDefault();
        return $target.val(value.replace(/\s\d?$/, ''));
      }
    };

  var _getFormattedCardNumber = function(num) {
      var card, groups, upperLength, ref;
      
      card = Cards.fromNumber(num);
      
      if (!card) {
        return num;
      }
      
      upperLength = card.length[card.length.length - 1];
      num = num.replace(/\D/g, '');
      num = num.slice(0, +upperLength + 1 || 9e9);
      
      if(card.format.global) {
        return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
      } else {
        groups = card.format.exec(num);
          
        if (groups != null) {
          groups.shift();
        }

        return groups != null ? groups.join(' ') : void 0;
      }
    };

  var _reFormatCardNumber = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = angular.element(e.target);
    
      value = $target.val();
      value = _getFormattedCardNumber(value);
      return $target.val(value);
    });
  };

  var _parseCardNumber = function(value) {
    return value != null ? value.replace(/\s/g, '') : value;
  };

  _formats['card'] = function(elem, ctrl){
    elem.bind('keypress', _restrictCardNumber);
    elem.bind('keypress', _formatCardNumber);
    elem.bind('keydown', _formatBackCardNumber);
    elem.bind('paste', _reFormatCardNumber);

    ctrl.$parsers.push(_parseCardNumber);
    ctrl.$formatters.push(_getFormattedCardNumber);
  }


  // cvc

  _formatCVC = function(e){
    $target = angular.element(e.currentTarget);
    digit = String.fromCharCode(e.which);
    
    if (!/^\d+$/.test(digit) && !e.meta && e.keyCode >= 46) {
      e.preventDefault();
      return;
    }

    val = $target.val() + digit;
    
    if(val.length <= 4){
      return;
    } else {
      e.preventDefault();
      return;
    }
  }

  _formats['cvc'] = function(elem){
    elem.bind('keypress', _formatCVC)
  }

  // expiry

  _restrictExpiry = function(e) {
    var $target, digit, value;
    
    $target = angular.element(e.currentTarget);
    digit = String.fromCharCode(e.which);
    
    if (!/^\d+$/.test(digit) && !e.meta && e.keyCode >= 46) {
      e.preventDefault();
      return;
    }
    
    if(_hasTextSelected($target)) {
      return;
    }
    
    value = $target.val() + digit;
    value = value.replace(/\D/g, '');
    
    if (value.length > 6) {
      e.preventDefault()
      return;
    }
  };

  _formatExpiry = function(e) {
    var $target, digit, val;
    
    digit = String.fromCharCode(e.which);
    
    if (!/^\d+$/.test(digit) && !e.meta && e.keyCode >= 46) {
      e.preventDefault();
      return;
    }
    
    $target = angular.element(e.currentTarget);
    val = $target.val() + digit;
    
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
      e.preventDefault();
      return $target.val("0" + val + " / ");

    } else if (/^\d\d$/.test(val)) {
      e.preventDefault();
      return $target.val("" + val + " / ");

    }
  };

  _formatForwardExpiry = function(e) {
    var $target, digit, val;
    
    digit = String.fromCharCode(e.which);
    
    if (!/^\d+$/.test(digit) && !e.meta && e.keyCode >= 46) {
      return;
    }
    
    $target = angular.element(e.currentTarget);
    val = $target.val();
    
    if (/^\d\d$/.test(val)) {
      return $target.val("" + val + " / ");
    }
  };

  _formatForwardSlash = function(e) {
    var $target, slash, val;
    
    slash = String.fromCharCode(e.which);
    
    if (slash !== '/') {
      return;
    }
    
    $target = angular.element(e.currentTarget);
    val = $target.val();
    
    if (/^\d$/.test(val) && val !== '0') {
      return $target.val("0" + val + " / ");
    }
  };

  _formatBackExpiry = function(e) {
    var $target, value;
    
    if (e.meta) {
      return;
    }
    
    $target = angular.element(e.currentTarget);
    value = $target.val();
    
    if (e.which !== 8) {
      return;
    }
    
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    
    if (/\d(\s|\/)+$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\d(\s|\/)*$/, ''));

    } else if (/\s\/\s?\d?$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\s\/\s?\d?$/, ''));

    }
  };

  var _parseExpiry = function(value) {
    if(value != null) {
      var obj = Common.parseExpiry(value);
      var expiry = new Date(obj.year, obj.month-1);
      return $filter('date')(expiry, 'MM/yyyy');
    }
    return null;
  };

  var _getFormattedExpiry = function(value) {
    if(value != null) {
      var obj = Common.parseExpiry(value);
      var expiry = new Date(obj.year, obj.month-1);
      return $filter('date')(expiry, 'MM / yyyy');
    }
    return null;
  };


  _formats['expiry'] = function(elem, ctrl){
    elem.bind('keypress', _restrictExpiry);
    elem.bind('keypress', _formatExpiry);
    elem.bind('keypress', _formatForwardSlash);
    elem.bind('keypress', _formatForwardExpiry);
    elem.bind('keydown', _formatBackExpiry);

    ctrl.$parsers.push(_parseExpiry);
    ctrl.$formatters.push(_getFormattedExpiry);
  }

  return function(type, elem, ctrl){
    if(!_formats[type]){

      types = Object.keys(_formats);

      errstr  = 'Unknown type for formatting: "'+type+'". ';
      errstr += 'Should be one of: "'+types.join('", "')+'"';

      throw errstr;
    }
    return _formats[type](elem, ctrl);
  }

}])

.directive('paymentsFormat', ['$window', '_Format', function($window, _Format){
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attr, ctrl){
        _Format(attr.paymentsFormat, elem, ctrl);
      }
    }
}]);angular.module('angularPayments')



.factory('_Validate', ['Cards', 'Common', '$parse', function(Cards, Common, $parse){

  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; }

  var _luhnCheck = function(num) {
    var digit, digits, odd, sum, i, len;

    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();

    for (i = 0, len = digits.length; i < len; i++) {

      digit = digits[i];
      digit = parseInt(digit, 10);

      if ((odd = !odd)) {
        digit *= 2;
      }

      if (digit > 9) {
        digit -= 9;
      }

      sum += digit;

    }

    return sum % 10 === 0;
  };

  var _validators = {}

  _validators['cvc'] = function(cvc, ctrl, scope, attr){
      var ref, ref1;

      // valid if empty - let ng-required handle empty
      if(cvc == null || cvc.length == 0) return true;

      if (!/^\d+$/.test(cvc)) {
        return false;
      }

      var type;
      if(attr.paymentsTypeModel) {
          var typeModel = $parse(attr.paymentsTypeModel);
          type = typeModel(scope);
      }

      if (type) {
        return ref = cvc.length, __indexOf.call((ref1 = Cards.fromType(type)) != null ? ref1.cvcLength : void 0, ref) >= 0;
      } else {
        return cvc.length >= 3 && cvc.length <= 4;
      }
  }

  _validators['card'] = function(num, ctrl, scope, attr){
      var card, ref, typeModel;

      if(attr.paymentsTypeModel) {
          typeModel = $parse(attr.paymentsTypeModel);
      }

      var clearCard = function(){
          if(typeModel) {
              typeModel.assign(scope, null);
          }
          ctrl.$card = null;
      };

      // valid if empty - let ng-required handle empty
      if(num == null || num.length == 0){
        clearCard();
        return true;
      }

      num = (num + '').replace(/\s+|-/g, '');

      if (!/^\d+$/.test(num)) {
        clearCard();
        return false;
      }

      card = Cards.fromNumber(num);

      if(!card) {
        clearCard();
        return false;
      }

      ctrl.$card = angular.copy(card);

      if(typeModel) {
          typeModel.assign(scope, card.type);
      }

      ret = (ref = num.length, __indexOf.call(card.length, ref) >= 0) && (card.luhn === false || _luhnCheck(num));

      return ret;
  }

  _validators['expiry'] = function(val){
    // valid if empty - let ng-required handle empty
    if(val == null || val.length == 0) return true;

    obj = Common.parseExpiry(val);

    month = obj.month;
    year = obj.year;

    var currentTime, expiry, prefix;

    if (!(month && year)) {
      return false;
    }

    if (!/^\d+$/.test(month)) {
      return false;
    }

    if (!/^\d+$/.test(year)) {
      return false;
    }

    if (!(parseInt(month, 10) <= 12)) {
      return false;
    }

    if (year.length === 2) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }

    expiry = new Date(year, month);
    currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);

    return expiry > currentTime;
  }

  return function(type, val, ctrl, scope, attr){
    if(!_validators[type]){

      types = Object.keys(_validators);

      errstr  = 'Unknown type for validation: "'+type+'". ';
      errstr += 'Should be one of: "'+types.join('", "')+'"';

      throw errstr;
    }
    return _validators[type](val, ctrl, scope, attr);
  }
}])


.factory('_ValidateWatch', ['_Validate', function(_Validate){

    var _validatorWatches = {}

    _validatorWatches['cvc'] = function(type, ctrl, scope, attr){
        if(attr.paymentsTypeModel) {
            scope.$watch(attr.paymentsTypeModel, function(newVal, oldVal) {
                if(newVal != oldVal) {
                    var valid = _Validate(type, ctrl.$modelValue, ctrl, scope, attr);
                    ctrl.$setValidity(type, valid);
                }
            });
        }
    }

    return function(type, ctrl, scope, attr){
        if(_validatorWatches[type]){
            return _validatorWatches[type](type, ctrl, scope, attr);
        }
    }
}])

.directive('paymentsValidate', ['$window', '_Validate', '_ValidateWatch', function($window, _Validate, _ValidateWatch){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl){

      var type = attr.paymentsValidate;

      _ValidateWatch(type, ctrl, scope, attr);

      var validateFn = function(val) {
          var valid = _Validate(type, val, ctrl, scope, attr);
          ctrl.$setValidity(type, valid);
          return valid ? val : undefined;
      };

      ctrl.$formatters.push(validateFn);
      ctrl.$parsers.push(validateFn);
    }
  }
}])
;angular.module('angularPayments')

.directive('stripeForm', ['$window', '$parse', 'Common', function($window, $parse, Common) {
    
  // directive intercepts form-submission, obtains Stripe's cardToken using stripe.js
  // and then passes that to callback provided in stripeForm, attribute.

  // data that is sent to stripe is filtered from scope, looking for valid values to
  // send and converting camelCase to snake_case, e.g expMonth -> exp_month


  // filter valid stripe-values from scope and convert them from camelCase to snake_case
  _getDataToSend = function(data){
           
    var possibleKeys = ['number', 'expMonth', 'expYear', 
                    'cvc', 'name','addressLine1', 
                    'addressLine2', 'addressCity',
                    'addressState', 'addressZip',
                    'addressCountry']
    
    var camelToSnake = function(str){
      return str.replace(/([A-Z])/g, function(m){
        return "_"+m.toLowerCase();
      });
    }

    var ret = {};

    for(i in possibleKeys){
        if(possibleKeys.hasOwnProperty(i)){
            ret[camelToSnake(possibleKeys[i])] = angular.copy(data[possibleKeys[i]]);
        }
    }

    ret['number'] = ret['number'].replace(/ /g,'');

    return ret;
  }

  return {
    restrict: 'A',
    link: function(scope, elem, attr) {

      if(!$window.Stripe){
          throw 'stripeForm requires that you have stripe.js installed. Include https://js.stripe.com/v2/ into your html.';
      }

      var form = angular.element(elem);

      form.bind('submit', function() {

        expMonthUsed = scope.expMonth ? true : false;
        expYearUsed = scope.expYear ? true : false;

        if(!(expMonthUsed && expYearUsed)){
          exp = Common.parseExpiry(scope.expiry)
          scope.expMonth = exp.month
          scope.expYear = exp.year
        }

        var button = form.find('button');
        button.prop('disabled', true);

        if(form.hasClass('ng-valid')) {
          

          $window.Stripe.createToken(_getDataToSend(scope), function() {
            var args = arguments;
            scope.$apply(function() {
              scope[attr.stripeForm].apply(scope, args);
            });
            button.prop('disabled', false);

          });

        } else {
          scope.$apply(function() {
            scope[attr.stripeForm].apply(scope, [400, {error: 'Invalid form submitted.'}]);
          });
          button.prop('disabled', false);
        }

        scope.expiryMonth = expMonthUsed ? scope.expMonth : null;
        scope.expiryYear = expYearUsed ? scope.expMonth : null;

      });
    }
  }
}]);var bespeak = angular.module('bespeak',['ui.bootstrap', 'bespeak.services', 'bespeak.progress', 'bespeak.schedule', 'bespeak.reservation', 'bespeak.payment']);

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


;angular.module('bespeak.payment',['ui.bootstrap', 'bespeak.services', 'angularPayments']).controller("PaymentCtrl", ['$scope', '$location', '$q', '_bspApi', '_bspReservation', '_bspAlerts',
function($scope, $location, $q, _bspApi, _bspReservation, _bspAlerts) {
	$scope.course = _bspReservation.course();
	$scope.attendees = _bspReservation.attendees();
	$scope.email = _bspReservation.email();
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
			$location.path(window._bspConfig.orderPath); 
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
}]);;var bespeakProgress = angular.module('bespeak.progress',['ui.bootstrap', 'bespeak.services']);

bespeakProgress.controller("ProgressCtrl", ['$scope', '$location', '_bspReservation', function($scope, $location, _bspReservation) {
	var reservationPath = '/reservation/';
	var paymentPath = '/payment';
	var pages = [window._bspConfig.orderPath, reservationPath, paymentPath]
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
;angular.module('bespeak.schedule',['ui.bootstrap', 'bespeak.services']).controller("ScheduleCtrl", ['$scope', '$q', '$location', '$filter', '_bspApi', '_bspReservation', 
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
}]);;angular.module('bespeak.reservation',['ui.bootstrap', 'bespeak.services']).controller("ReservationCtrl", ['$scope', '$location', '$routeParams', '$q', '_bspApi', '_bspReservation', 
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
}]);;angular.module('bespeak.services', ['bespeak.services.alerts', 'bespeak.services.api', 'bespeak.services.reservation']);/* services.js */

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
;/* services.js */

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
						var localOffset = new Date().getTimezoneOffset()*60;
						return new Date(time*1000 + (timeZoneOffset + localOffset) * 1000);
					}
					
					var course_type = getObjectById(course_types, course.course_type_id);
					var office = getObjectById(offices, course.office_id);
					course.courseName = course_type.name;
					course.cost = course_type.cost;
					course.officeName = office.name;
					course.officeTimeZoneOffset = office.timeZoneOffset;
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
}]);;angular.module('bespeak.services.reservation', []).service('_bspReservation', ['$q', function($q) {
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
}]);;angular.module('bespeak').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/book',
    "<form id=_bsp-book name=schedule ng-submit=\"navigate('/reservation/'+form.course.id, true)\" novalidate><fieldset><legend>Schedule Your Course</legend><select class=input-xxlarge data-ng-model=form.course_id data-ng-options=\"course.id as course|course:'START &mdash; OFFICE' for course in courses | filter:course_filter | orderBy:start_at\" required></select></fieldset><fieldset><button type=submit class=\"btn btn-primary\">Next</button></fieldset></form>"
  );


  $templateCache.put('templates/payment',
    "<form id=_bsp-payment name=payment ng-submit=book() novalidate><fieldset class=reservation-details><legend>Your Reservation Details</legend><div class=course-details><span class=name>{{course.courseName}}</span><span class=office>{{course.officeName}}</span><span class=date-info>{{course.startDate | date:\"EEEE M/d/yy 'from' h:mm a\" }} to {{course.endDate | date:'h:mm a'}}</span><span class=attendees>{{attendees}}</span><span class=email>{{email}}</span><div class=price><span class=attendees>{{attendees}}</span><span class=multiply>&times;</span><span class=cost>{{course.cost | currency:\"$\"}}</span><span class=equals>=</span><span class=total>{{course.cost * attendees | currency:\"$\"}}</span></div></div></fieldset><fieldset class=payment-options><legend>How Would You Like to Pay?</legend><label class=\"radio inline\"><input type=radio value=credit_card ng-model=form.paymentMethod>Credit&nbsp;Card</label><label class=\"radio inline\"><input type=radio value=cash ng-model=form.paymentMethod>Cash</label><label class=\"radio inline\"><input type=radio value=coupon ng-model=form.paymentMethod>Coupon</label></fieldset><div id=payment-details ng-switch=\"\" on=form.paymentMethod><section id=pay-cash ng-switch-when=cash><fieldset class=payment-options><div class=\"alert warning\"><strong>Please be prepared to pay course fees by cash or check when arriving to class.</strong></div><div class=payment-details><div class=due><div class=due-now for=due-now>Total Due Now</div><div class=total id=cash-due-now name=due-now>{{0 | currency:\"$\"}}</div></div></div><div class=personal-details><div class=\"control-group name\" ng-class=\"{'error': !payment.name.$valid && submitted}\"><label for=cash-name>Name</label><input id=cash-name name=name ng-model=name placeholder=\"Your Name\" required><span class=help-inline ng-hide=\"payment.name.$valid || !submitted\">Please enter your name.</span></div><div class=\"control-group phone\" ng-class=\"{'error': !payment.phone.$valid && submitted}\"><label for=cash-telephone>Telephone</label><input id=cash-telephone name=phone ng-model=telephone placeholder=\"(617) 555 - 1212\" type=tel required><span class=help-inline ng-hide=\"payment.phone.$valid || !submitted\">Please enter a valid phone number.</span></div></div></fieldset></section><section id=pay-credit_card ng-switch-when=credit_card><fieldset class=payment-options><div class=payment-details><div class=due><div class=due-now>Total Due Now</div><div class=total id=credit-card-due-now name=due-now>{{course.cost * attendees | currency:\"$\"}}</div></div></div><div id=credit-card-details class=\"control-group name\" ng-class=\"{'error': !payment.name.$valid && submitted}\"><label for=credit-card-name>Name (as it appears on card)</label><input class=input-xlarge id=credit-card-name ng-model=form.name placeholder=\"Your Name\" required name=name><span class=help-inline ng-hide=\"payment.name.$valid || !submitted\">Please enter the name on the credit card.</span></div><div class=control-group ng-class=\"{'error': !payment.creditCardNumber.$valid && submitted}\"><label for=credit-card-number>Card Number</label><input autocomplete=off class=input-xlarge id=credit-card-number ng-model=form.paymentDetails.creditCardNumber size=20 input=\"\" payments-format=card payments-validate=card required name=creditCardNumber payments-type-model=type ng-class=form.paymentDetails.type><span class=help-inline ng-hide=\"payment.creditCardNumber.$valid || !submitted\">Please enter a valid credit card number.</span><div class=acceptedCards><img alt=Visa class=fsCreditCardLogo src=//dts8zy8jzywwi.cloudfront.net/37/assets/visa.png><img alt=MasterCard class=fsCreditCardLogo src=//dts8zy8jzywwi.cloudfront.net/37/assets/mastercard.png><img alt=\"American Express\" class=fsCreditCardLogo src=//dts8zy8jzywwi.cloudfront.net/37/assets/amex.png><img alt=Discover class=fsCreditCardLogo src=//dts8zy8jzywwi.cloudfront.net/37/assets/discover.png></div></div><div class=\"control-group creditCardExp\" ng-class=\"{'error': !payment.creditCardExp.$valid && submitted}\"><label class=required for=credit-card-exp-month>Expiration Date</label><input class=input-small name=creditCardExp id=credit-card-exp ng-model=form.paymentDetails.creditCardExp payments-format=expiry payments-validate=expiry><span class=help-inline ng-hide=\"payment.creditCardExp.$valid || !submitted\">Please enter a valid expiration date.</span></div><div class=\"control-group creditCardCCV\" ng-class=\"{'error': !payment.creditCardCCV.$valid && submitted}\"><label class=required for=credit-card-ccv>Security Code</label><input class=input-small id=credit-card-ccv maxlength=4 ng-model=form.paymentDetails.creditCardCCV type=tel required payments-format=cvc payments-type-model=type payments-validate=cvc name=creditCardCCV><span class=help-inline ng-hide=\"payment.creditCardCCV.$valid || !submitted\">Please enter a valid security code (found on the back of your credit card).</span></div></fieldset></section><section id=pay-coupon ng-switch-when=coupon><fieldset class=payment-options><div class=payment-details><div class=due><div class=due-now for=due-now>Total Due Now</div><div class=total id=cash-due-now name=due-now>{{0 | currency:\"$\"}}</div></div></div><div class=personal-details><div class=\"control-group name\"><label class=required for=coupon-name>Name</label><input id=coupon-name ng-model=name placeholder=\"Your Name\" required></div><div class=\"control-group phone\"><label class=required for=coupon-telephone>Telephone</label><input id=coupon-telephone ng-model=phone placeholder=\"(617) 555 - 1212\" type=tel required></div><div class=control-group><label class=required for=coupon-code>Coupon Code</label><input id=coupon-code ng-model=coupon placeholder=\"Coupon Code\" required></div></div></fieldset></section></div><fieldset><button ng-click=\"navigate('/reservation/'+course.id)\" class=\"btn btn-info\">Previous</button><button class=\"btn btn-primary\" type=submit>Book</button></fieldset></form>"
  );


  $templateCache.put('templates/reservation',
    "<form id=_bsp-reservation name=reservation ng-submit=\"navigate('/payment', true)\" novalidate><fieldset class=reservation-details><legend>Your Reservation Details</legend><div class=course-details><span class=name>{{course.courseName}}</span><span class=office>{{course.officeName}}</span><span class=date-info>{{course.startDate | date:\"EEEE M/d/yy 'from' h:mm a\" }} to {{course.endDate | date:'h:mm a'}}</span></div><div class=control-group ng-class=\"{'error': !reservation.email.$valid && submitted}\"><label class=control-label for=inputEmail>Email</label><div class=controls><input type=email name=email id=inputEmail placeholder=Email ng-model=form.email required><span class=help-inline ng-hide=\"reservation.email.$valid || !submitted\">Please enter a valid email address.</span></div></div><div class=\"booking-details control-group\" ng-class=\"{'error': !reservation.attendees.$valid && submitted}\"><label class=control-label for=attendees>How many people?</label><input name=attendees type=number id=attendees class=attendee-selector ng-model=form.attendees value={{form.attendees}} min=1 max=10 size=2 required><span class=help-inline ng-hide=\"reservation.attendees.$valid || !submitted\">Please specify the number of attendees.</span><div class=price><span class=attendees>{{form.attendees}}</span><span class=multiply>&times;</span><span class=cost>{{course.cost | currency:\"$\"}}</span><span class=equals>=</span><span class=total>{{course.cost * form.attendees | currency:\"$\"}}</span></div></div></fieldset><fieldset><button ng-click=\"navigate('orderPath', false)\" class=\"btn btn-info\">Previous</button><button type=submit class=\"btn btn-primary\">Next</button></fieldset></form>"
  );

}]);
