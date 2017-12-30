angular.module('trendrr').directive('educationPostsList', function (userService, postService) {
  return {
    restrict: 'EA',
    replace: true,
    scope: true,
    controller: function($scope, $stateParams){
      postService.getEductionPosts().$loaded(function(posts) {
        $scope.educationPosts = posts;
        for (var i = posts.length - 1; i >= 0; i--) {
          if(posts[i].$id === $stateParams.selectedPostId){
            postService.setSelectedPost(posts[i]);
            $scope.showPostModal(posts[i]);
          }
        }
      });
      postService.getPendingEducationPosts().$loaded(function(result) {
        $scope.pendingEducationPosts = result;
      });
      $scope.user = userService.user;
    },
    templateUrl: 'scripts/directives/posts-list/education-posts-list.html'
  };
});
