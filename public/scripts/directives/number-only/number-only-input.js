angular.module('trendrr').directive('validNumber', function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace(/[^0-9]+/g, '');
                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if((event.keyCode <= 57 && event.keyCode >= 48) || event.keyCode == 46) {
                    //good characters
                    console.log('clean');
                } else{
                    console.log("STOP", event.keyCode);
                    event.preventDefault();
                }
            });
        }
    };
});