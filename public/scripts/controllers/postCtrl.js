'use strict';
angular.module('trendrr').controller('PostController', function ($scope, $firebaseStorage, $firebaseArray, postService, userService, $rootScope) {

  $scope.addNewFileUpload = {};
  $scope.addNewLogoUpload = {};
  $scope.rawVideoUrl = '';
  $scope.newPost = {
    attachments: [],
    video: ''
  };

  $scope.user = userService.user;

  $rootScope.$watch('currentView', function (view) {
    if (view !== undefined) {
      $scope.currentView = view;
      if (view === 'education') {
        $scope.educationView = true;
      } else if (view === 'investing') {
        $scope.investingView = true;
      } else if (view === 'comingSoon') {
        $scope.comingSoonView = true;
      }
    }
  });

  $scope.whereAmI = 'post controller';

  $scope.createCompany = function(postType) {
    console.log(postType);
    if (postType === 'education') {
      postService.companySubmitted({submitted: true});
      var ref = firebase.database().ref().child('education-posts');
      var posts = $firebaseArray(ref);
      $scope.newPost.approved = false;
      $scope.newPost.twitterShares = 0;
      $scope.newPost.totalVotes = 0;
      $scope.newPost.facebookShares = 0;
      $scope.newPost.totalDonated = 0;
      $scope.newPost.uuid = guid();
      $scope.newPost.owner = $scope.user.$id;

      if($scope.newPost.website){
        if($scope.newPost.website.substring(0, 4) !== 'http'){
          $scope.newPost.website = 'http://' + $scope.newPost.website;
        }
      }

      console.log('Post to submit: ', $scope.newPost);
      posts.$add($scope.newPost).then(function(result) {
        $("#createModal").modal('hide');
      }).catch(function (err) {
        console.log('Error: ',err)
      });
    } else if (postType === 'investing') {
      postService.companySubmitted({submitted: true});
      var ref = firebase.database().ref().child('investing-posts');
      var posts = $firebaseArray(ref);
      $scope.newPost.approved = false;
      $scope.newPost.twitterShares = 0;
      $scope.newPost.totalVotes = 0;
      $scope.newPost.facebookShares = 0;
      $scope.newPost.totalDonated = 0;
      $scope.newPost.uuid = guid();
      $scope.newPost.owner = $scope.user.$id;

      if($scope.newPost.website){
        if($scope.newPost.website.substring(0, 4) !== 'http'){
          $scope.newPost.website = 'http://' + $scope.newPost.website;
        }
      }

      console.log('Post to submit: ', $scope.newPost);
      posts.$add($scope.newPost).then(function(result) {
        $("#createModal").modal('hide');
      }).catch(function (err) {
        console.log('Error: ',err)
      });
    } else if (postType === 'comingSoon') {
      postService.companySubmitted({submitted: true});
      var ref = firebase.database().ref().child('coming-soon-posts');
      var posts = $firebaseArray(ref);
      $scope.newPost.approved = false;
      $scope.newPost.twitterShares = 0;
      $scope.newPost.totalVotes = 0;
      $scope.newPost.facebookShares = 0;
      $scope.newPost.totalDonated = 0;
      $scope.newPost.uuid = guid();
      $scope.newPost.owner = $scope.user.$id;

      if($scope.newPost.website){
        if($scope.newPost.website.substring(0, 4) !== 'http'){
          $scope.newPost.website = 'http://' + $scope.newPost.website;
        }
      }

      console.log('Post to submit: ', $scope.newPost);
      posts.$add($scope.newPost).then(function(result) {
        $("#createModal").modal('hide');
      }).catch(function (err) {
        console.log('Error: ',err)
      });
    }
  };

  $scope.fileUpdate = function (files) {
    var fileNameSplit = files[0].name.split('.');
    console.log('FILE', fileNameSplit[fileNameSplit.length - 1]);
    if(fileNameSplit[fileNameSplit.length - 1] === 'jpg' || fileNameSplit[fileNameSplit.length - 1] === 'png') {
      var fileName = guid() + '.' + fileNameSplit[fileNameSplit.length - 1];
      var storageRef;
      if ($rootScope.currentView === 'educationView') {
        storageRef = firebase.storage().ref('education-posts/photos/' + fileName);
      } else if ($rootScope.currentView === 'investingView') {
        storageRef = firebase.storage().ref('investing-posts/photos/' + fileName);
      } else if ($rootScope.currentView === 'comingSoonView') {
        storageRef = firebase.storage().ref('coming-soon-posts/photos/' + fileName);
      }
      var storage = $firebaseStorage(storageRef);
      var uploadTask = storage.$put(files[0]);
      uploadTask.$complete(function (result) {
        if ($rootScope.currentView === 'educationView') {
          $scope.newPost.attachments.push({
            url: result.downloadURL,
            filename: fileName,
            bucket: 'education-posts/photos/'
          });
        } else if ($rootScope.currentView === 'investingView') {
          $scope.newPost.attachments.push({
            url: result.downloadURL,
            filename: fileName,
            bucket: 'investing-posts/photos/'
          });
        } else if ($rootScope.currentView === 'comingSoonView') {
          $scope.newPost.attachments.push({
            url: result.downloadURL,
            filename: fileName,
            bucket: 'coming-soon-posts/photos/'
          });
        }
      });
    } else{
      alert('File type not supported, please upload a jpg or png.');
    }
  };

  $scope.removePhoto = function(bucket, fileName){
    var storageRef = firebase.storage().ref(bucket+fileName);
    var storage = $firebaseStorage(storageRef);
    storage.$delete().then(function() {
      for (var i = $scope.newPost.attachments.length - 1; i >= 0; i--) {
        if($scope.newPost.attachments[i].filename === fileName){
          $scope.newPost.attachments.splice(i, 1);
        }
      }
    });
  };

  $scope.logoUpdate = function (files) {
    var fileNameSplit = files[0].name.split('.');
    if(fileNameSplit[fileNameSplit.length - 1] === 'jpg' || fileNameSplit[fileNameSplit.length - 1] === 'png') {
      var fileName = guid() + '.' + fileNameSplit[fileNameSplit.length - 1];
      var storageRef;
      if ($rootScope.currentView === 'educationView') {
        storageRef = firebase.storage().ref('education-posts/logos/' + fileName);
      } else if ($rootScope.currentView === 'investingView') {
        storageRef = firebase.storage().ref('investing-posts/logos/' + fileName);
      } else if ($rootScope.currentView === 'comingSoonView') {
        storageRef = firebase.storage().ref('coming-soon-posts/logos/' + fileName);
      }
      var storage = $firebaseStorage(storageRef);
      var uploadTask = storage.$put(files[0]);
      uploadTask.$complete(function(result) {
        if ($rootScope.currentView === 'educationView') {
          $scope.newPost.logo = {
            url: result.downloadURL,
            filename: fileName,
            bucket: 'education-posts/logos/'
          };
        } else if ($rootScope.currentView === 'investingView') {
          $scope.newPost.logo = {
            url: result.downloadURL,
            filename: fileName,
            bucket: 'investing-posts/logos/'
          };
        } else if ($rootScope.currentView === 'comingSoonView') {
          $scope.newPost.logo = {
            url: result.downloadURL,
            filename: fileName,
            bucket: 'coming-soon-posts/logos/'
          };
        }
      });
    } else{
      alert('File type not supported, please upload a jpg or png.');
    }
  };
  $scope.removeLogo = function(bucket, fileName){
    var storageRef = firebase.storage().ref(bucket+fileName);
    var storage = $firebaseStorage(storageRef);
    storage.$delete().then(function() {
      delete $scope.newPost.logo.url;
      delete $scope.newPost.logo.bucket;
      delete $scope.newPost.logo.filename;
    });
  };
  $scope.updateVideoUrl = function () {
    var exploded = $scope.rawVideoUrl.split('=');
    $scope.newPost.video = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+exploded[1]+'" frameborder="0" allowfullscreen></iframe>';
  };

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }
});
