angular.module('trendrr').directive('comingSoonPostsList', function (userService, postService) {
  return {
    restrict: 'EA',
    replace: true,
    scope: true,
    controller: function($scope, $stateParams){
      postService.getComingSoonPosts().$loaded(function(posts) {
        $scope.comingSoonPosts = posts;
        for (var i = posts.length - 1; i >= 0; i--) {
          if(posts[i].$id === $stateParams.selectedPostId){
            postService.setSelectedPost(posts[i]);
            $scope.showPostModal(posts[i]);
          }
        }
      });
      postService.getPendingComingSoonPosts().$loaded(function(result) {
        $scope.getPendingComingSoonPosts = result;
      });
      $scope.user = userService.user;
    },
    templateUrl: 'scripts/directives/posts-list/coming-soon-posts-list.html'
  };
});
