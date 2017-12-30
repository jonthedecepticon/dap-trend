'use strict';

angular.module('trendrr').service('userService', function ($firebaseArray, $firebaseObject, postService, $rootScope) {

  var userData = {};
  var startupOwnerEmailList = [];

  return {
    getUserByUuid: function (uuid) {
      var usersRef = firebase.database().ref().child('users');
      var usersCollection = $firebaseArray(usersRef);
      var query = usersCollection.$ref().orderByChild('uuid').equalTo(uuid);
      return $firebaseArray(query);
    },
    getVotesByUuid: function(uuid){
      var usersRef = firebase.database().ref().child('users');
      var usersCollection = $firebaseArray(usersRef);
      var query = usersCollection.$keyAt({uuid: uuid});
      return $firebaseArray(query);
    },
    getEmailByKey: function(key){
      console.log('KEY', key);
      var usersRef = firebase.database().ref().child('users').child(key);
      return $firebaseObject(usersRef);
    },
    setUserInfo: function(newUser){
      var localUser = {
        admin: newUser.admin,
        $id: newUser.$id,
        email: newUser.email,
        fullName: newUser.fullName,
        picture: newUser.picture,
        role: newUser.role,
        uuid: newUser.uuid
      };
      angular.copy(localUser, userData);
    },
    addVoteForPost: function(postId, view){
      var userId = userData.$id;
      var votesRef = firebase.database().ref().child('votes');
      var votesCollection = $firebaseArray(votesRef);
      var query = votesCollection.$ref().orderByChild('userId').equalTo(userId);
      $firebaseArray(query).$loaded(function (votes) {
        var voted = false;
        for (var i = votes.length - 1; i >= 0; i--) {
          if(votes[i].postId === postId) {
            voted = true;
          }
        }

        if(!voted) {
          var ref = firebase.database().ref().child('votes');
          var votes = $firebaseArray(ref);
          var newVote = {
            postId: postId,
            userId: userId,
            dateCreated: Date.now()
          };
          votes.$add(newVote).then(function (ref) {
            //increment post votes by 1
            postService.incrementPostVote(postId, 1, $rootScope.currentView);
          }).catch(function (err) {
            console.log('Unable to register', err);
          });
        } else{
          console.log('already voted ya wanker');
        }
      });


    },
    setStartupOwnerEmails: function (emails) {
      angular.copy(emails, startupOwnerEmailList);
    },
    startupOwnerEmails: startupOwnerEmailList,
    user: userData
  }
});
