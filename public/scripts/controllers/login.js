'use strict';

angular.module('trendrr').controller('LoginCtrl', function ($scope, $firebaseAuth, $rootScope, postService, userService, $firebaseArray) {



  /* - - - - - - - - - - - - - - - - - *\
  creates new item via createModal
  \*- - - - - - - - - - - - - - - - - -*/
  $scope.createItem = function(itemNameFromView, itemTagLineFromView, itemWebsiteFromView, itemImageFromView, contactNameFromView, contactEmailFromView, contactPhoneFromView){
    var guid = (function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      }
      return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
      };
    })();
    var uuid = guid();

    // var dataBase = new Firebase ("https://trendrr-8f523.firebaseio.com/startups" + uuid);
    //   dataBase.set({
    //     "name": itemNameFromView,
    //     "image": itemImageFromView,
    //     "tagline": itemTagLineFromView,
    //     "contactEmail": contactEmailFromView,
    //     "contactName": contactNameFromView,
    //     "contactPhone": contactPhoneFromView,
    //     "link": itemWebsiteFromView,
    //     "dateCreated": new Date(),
    //     "upVotes": {
    //       'value':0,
    //    },
    //     "facebookVotes": {
    //       'value':0,
    //    },
    //     "twitterVotes": {
    //       'value':0,
    //    }
    //   });
  };

  $scope.toggleEmails = function(){
    if(userService.startupOwnerEmails.length > 0){
      userService.setStartupOwnerEmails([]);
    } else {
      // show emails of startups
      postService.getAllEducationPosts().$loaded(function (companies) {

        var userEmails = [];
        var pendingPromises = companies.length;
        for (var i = companies.length - 1; i >= 0; i--) {
          if (companies[i].owner) {
            userService.getEmailByKey(companies[i].owner).$loaded(function (user) {
              if ('email' in user && userEmails.indexOf(user.email) === -1) {
                userEmails.push(user.email);
              }
              pendingPromises--;
              if (pendingPromises === 0) {
                userService.setStartupOwnerEmails(userEmails);
              }
            });
          } else {
            pendingPromises--;
            if (pendingPromises === 0) {
              userService.setStartupOwnerEmails(userEmails);
            }
          }
        }
      });
    }
  };
  /* - - - - - - - - - - - - - - - - - *\
  logs in user / creates new
  \*- - - - - - - - - - - - - - - - - -*/
  $scope.submitLogin = function(){

    // {
    //     "rules":{
    //     ".read": true,
    //         "companies":{
    //         ".write":"auth != null",
    //             ".validate": "(auth.user_id === newData.child('user_id').val())"
    //     },
    //     "users":{
    //         "$id":{
    //             ".write":"!data.exists()",
    //                 ".validate": "(auth.user_id === newData.child('user_id').val())"
    //         }
    //     }
    // }
    // }
    login().then(function (authData, view) {
      var userObject = userService.getUserByUuid(authData.user.uid);
      userObject.$loaded(function (users) {
        var userExists = (users.length > 0);
        if (userExists) {
          var user = users[0];
          $scope.setUserData(user);
          $scope.resolveLogin(authData);
        } else {
          $scope.addUserToUsersArray(authData);
        }
      });
      console.log('view ----', view);
    }).catch(function (error) {
      console.log(error);
    });
  };
  function login(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');

    var auth = $firebaseAuth();

    // login with Facebook
    return auth.$signInWithPopup("facebook");
  };

  $scope.loginThenCreateModal = function(view){
    login().then(function (authData) {
      var userObject = userService.getUserByUuid(authData.user.uid);
      userObject.$loaded(function (users) {
        var userExists = (users.length > 0);
        if (userExists) {
          var user = users[0];
          $scope.setUserData(user);
          $scope.resolveLogin(authData);
        } else {
          $scope.addUserToUsersArray(authData);
        }
        $rootScope.currentView = view;
        $("#createModal").modal('show'); // hack (should use angular-strap or anguar-ui)
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  $scope.addUserToUsersArray = function(authData){
    var ref = firebase.database().ref().child('users');
    var users = $firebaseArray(ref);
    var newUser = {
      picture: authData.user.photoURL,
      role: 'user',
      email: authData.user.email,
      fullName: authData.user.providerData[0].displayName,
      uuid: authData.user.uid,
      dateCreated: Date.now(),
      lastLogin: Date.now()
    };
    users.$add(newUser).then(function (ref) {
      $scope.setUserData(newUser);
      $scope.resolveLogin(authData);
    }).catch(function (err) {
      console.log('Unable to register', err);
    });
  };

  $scope.setUserData = function(user){
    userService.setUserInfo(user);
    $scope.user = userService.user;
  };

  $scope.resolveLogin = function(authData){
    if ($scope.loginDeferred) {
      $scope.loginDeferred.resolve(authData);
    }
  };
});
