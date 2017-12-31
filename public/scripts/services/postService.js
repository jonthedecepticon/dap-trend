'use strict';

angular.module('trendrr').factory('postService', function postService($rootScope, $q, $firebaseObject, $firebaseArray){

  var FBURL = "https://blockchain-215cc.firebaseio.com";
  var postSubmitted = {
    submitted: false
  };
  var selectedPost = {};

  return {
    getList: function () {
      var ref;
      if ($rootScope.currentView === 'educationView') {
        ref = firebase.database().ref().child('education-posts').child(postId);
      } else if ($rootScope.currentView === 'investingView') {
        ref = firebase.database().ref().child('investing-posts').child(postId);
      } else if ($rootScope.currentView === 'comingSoonView') {
        ref = firebase.database().ref().child('coming-soon-posts').child(postId);
      }
      // download the data into a local object
      return $firebaseObject(ref);
    },
    getUsers: function () {
      var ref = firebase.database().ref().child('users');
      return $firebaseObject(ref);
    },
    getEductionPosts: function() {
      var ref = firebase.database().ref().child('education-posts');
      var usersCollection = $firebaseArray(ref);
      var query = usersCollection.$ref().orderByChild('approved').equalTo(true);
      return $firebaseArray(query);
    },
    setSelectedPost: function(post){
      angular.copy(post, selectedPost);
    },
    getSelectedPost: selectedPost,
    getAllEducationPosts: function() {
      var ref = firebase.database().ref().child('education-posts');
      return $firebaseArray(ref);
    },
    getPendingEducationPosts: function() {
      var ref = firebase.database().ref().child('education-posts');
      var usersCollection = $firebaseArray(ref);
      var query = usersCollection.$ref().orderByChild('approved').equalTo(false);
      return $firebaseArray(query);
    },




    getInvestingPosts: function() {
      var ref = firebase.database().ref().child('investing-posts');
      var usersCollection = $firebaseArray(ref);
      var query = usersCollection.$ref().orderByChild('approved').equalTo(true);
      return $firebaseArray(query);
    },
    getAllInvestingPosts: function() {
      var ref = firebase.database().ref().child('investing-posts');
      return $firebaseArray(ref);
    },
    getPendingInvestingPosts: function() {
      var ref = firebase.database().ref().child('investing-posts');
      var usersCollection = $firebaseArray(ref);
      var query = usersCollection.$ref().orderByChild('approved').equalTo(false);
      return $firebaseArray(query);
    },




    getComingSoonPosts: function() {
      var ref = firebase.database().ref().child('coming-soon-posts');
      var usersCollection = $firebaseArray(ref);
      var query = usersCollection.$ref().orderByChild('approved').equalTo(true);
      return $firebaseArray(query);
    },
    getAllComingSoonPosts: function() {
      var ref = firebase.database().ref().child('coming-soon-posts');
      return $firebaseArray(ref);
    },
    getPendingComingSoonPosts: function() {
      var ref = firebase.database().ref().child('coming-soon-posts');
      var usersCollection = $firebaseArray(ref);
      var query = usersCollection.$ref().orderByChild('approved').equalTo(false);
      return $firebaseArray(query);
    },





    incrementPostVote: function (postId, count, view) {
      var ref;
      if (view === 'educationView') {
        ref = firebase.database().ref().child('education-posts').child(postId);
      } else if (view === 'investingView') {
        ref = firebase.database().ref().child('investing-posts').child(postId);
      } else if (view === 'comingSoonView') {
        ref = firebase.database().ref().child('coming-soon-posts').child(postId);
      }
      $firebaseObject(ref).$loaded(function (post) {
        if(post.totalVotes){
          post.totalVotes+= count;
        } else{
          post.totalVotes = count;
        }
        post.$save();
      });
    },
    incrementFacebookShare: function (postId, userId) {
      var sharesRef = firebase.database().ref().child('facebookShares');
      var sharesCollection = $firebaseArray(sharesRef);
      var query = sharesCollection.$ref().orderByChild('userId').equalTo(userId);
      $firebaseArray(query).$loaded(function (shares) {
        var shared = false;
        for (var i = shares.length - 1; i >= 0; i--) {
          if(shares[i].postId === postId){
            shared = true;
          }
        }

        if(!shared) {
          var ref = firebase.database().ref().child('facebookShares');
          var shares = $firebaseArray(ref);
          var newShare = {
            postId: postId,
            userId: userId,
            dateCreated: Date.now()
          };
          shares.$add(newShare).then(function (result) {
            var ref;
            if ($rootScope.currentView === 'educationView') {
              ref = firebase.database().ref().child('education-posts').child(postId);
            } else if ($rootScope.currentView === 'investingView') {
              ref = firebase.database().ref().child('investing-posts').child(postId);
            } else if ($rootScope.currentView === 'comingSoonView') {
              ref = firebase.database().ref().child('coming-soon-posts').child(postId);
            }
            $firebaseObject(ref).$loaded(function (post) {
              if(post.facebookShares){
                post.facebookShares++;
              } else{
                post.facebookShares = 1;
              }
              post.$save();
              console.log('Share added');
            });
          }).catch(function (err) {
            console.log('Unable to register', err);
          });
        } else{
          console.log('already voted');
        }
      });
    },
    incrementTwitterShare: function (postId, userId) {
      var sharesRef = firebase.database().ref().child('twitterShares');
      var sharesCollection = $firebaseArray(sharesRef);
      var query = sharesCollection.$ref().orderByChild('userId').equalTo(userId);
      $firebaseArray(query).$loaded(function (shares) {
        var shared = false;
        for (var i = shares.length - 1; i >= 0; i--) {
          if(shares[i].postId === postId){
            shared = true;
          }
        }

        if(!shared) {
          var ref = firebase.database().ref().child('twitterShares');
          var shares = $firebaseArray(ref);
          var newShare = {
            postId: postId,
            userId: userId,
            dateCreated: Date.now()
          };
          shares.$add(newShare).then(function (result) {
            var ref;
            if ($rootScope.currentView === 'educationView') {
              ref = firebase.database().ref().child('education-posts').child(postId);
            } else if ($rootScope.currentView === 'investingView') {
              ref = firebase.database().ref().child('investing-posts').child(postId);
            } else if ($rootScope.currentView === 'comingSoonView') {
              ref = firebase.database().ref().child('coming-soon-posts').child(postId);
            }
            $firebaseObject(ref).$loaded(function (post) {
              if(post.twitterShares){
                post.twitterShares++;
              } else{
                post.twitterShares = 1;
              }
              post.$save();
              console.log('Share added');
            });
          }).catch(function (err) {
            console.log('Unable to register', err);
          });
        } else{
          console.log('already voted');
        }
      });
    },
    adjustVotesAndDonations: function (postId, amount) {
      var ref;
      if ($rootScope.currentView === 'educationView') {
        ref = firebase.database().ref().child('education-posts').child(postId);
      } else if ($rootScope.currentView === 'investingView') {
        ref = firebase.database().ref().child('investing-posts').child(postId);
      } else if ($rootScope.currentView === 'comingSoonView') {
        ref = firebase.database().ref().child('coming-soon-posts').child(postId);
      }
      $firebaseObject(ref).$loaded(function (post) {
        // post.totalVotes += parseInt(amount);
        post.totalDonated += parseInt(amount);
        post.$save();
      });
    },
    approvePost: function (postId) {
      var ref;
      if ($rootScope.currentView === 'educationView') {
        ref = firebase.database().ref().child('education-posts').child(postId);
      } else if ($rootScope.currentView === 'investingView') {
        ref = firebase.database().ref().child('investing-posts').child(postId);
      } else if ($rootScope.currentView === 'comingSoonView') {
        ref = firebase.database().ref().child('coming-soon-posts').child(postId);
      }
      $firebaseObject(ref).$loaded(function (post) {
        post.approved = true;
        post.$save();
      });
    },
    postSubmitted: function(state){
      angular.copy(state, postSubmitted);
    },
    getPostSubmitted: postSubmitted,
    loginPrompt: function(){
      $('body').toggleClass('modal-open-up');
      if (!$rootScope.loginDeferred) {
        $rootScope.loginDeferred=$q.defer();
      }
      return $rootScope.loginDeferred.promise;
    }
  };

});
