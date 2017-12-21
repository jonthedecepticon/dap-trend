angular.module('trendrr').directive('investingPostsList', function (userService, postService) {
  return {
    restrict: 'EA',
    replace: true,
    scope: true,
    controller: function($scope, $stateParams){
      postService.getInvestingPosts().$loaded(function(posts) {
        $scope.investingPosts = posts;
        for (var i = posts.length - 1; i >= 0; i--) {
          if(posts[i].$id === $stateParams.selectedCompanyId){
            postService.setSelectedPost(posts[i]);
            $scope.showPostModal(posts[i]);
          }
        }
      });
      postService.getPendingInvestingPosts().$loaded(function(result) {
        $scope.pendingInvestingPosts = result;
      });
      $scope.user = userService.user;
    },
    templateUrl: 'scripts/directives/posts-list/investing-posts-list.html'
  };
});
