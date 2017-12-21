angular.module('trendrr').directive('nav', function (userService) {
    return {
        restrict: 'EA',
        replace: true,
        scope:true,
        controller: function($scope){
            $scope.user = userService.user;
        },
        templateUrl: './views/nav.html'
    };
});