angular.module('trendrr').directive('heroCarousel', function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: true,
        templateUrl: 'scripts/directives/carousel/carousel.html'
    };
});