angular.module('trendrr').directive('newFileUpload', function (userService) {
    return {
        restrict: 'EA',
        replace: false,
        scope:true,
        controller: function($scope){
            $scope.user = userService.user;
        },
        templateUrl: 'views/newFileUpload.html'
    };
});