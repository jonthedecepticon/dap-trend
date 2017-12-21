angular.module('trendrr').directive('socialShare', function (Socialshare, postService) {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            company: '=',
            active: '=',
            user: '='
        },
        controller: function($scope){
            $scope.toggleSocial = function () {
                $scope.active = !$scope.active;
            };
            $scope.twitterShare = function () {
				postService.incrementTwitterShare($scope.company.$id, $scope.user.$id);
            };
            $scope.facebookShare = function () {
				postService.incrementFacebookShare($scope.company.$id, $scope.user.$id);
            };
            $scope.authenticate = function () {
                postService.loginPrompt();
            }
        },
        link: function($scope){

        },
        templateUrl: 'scripts/directives/social-share/social-share-uncache2.html'
    };
});