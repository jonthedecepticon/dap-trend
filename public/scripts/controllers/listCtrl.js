'use strict';

angular.module('trendrr')
.controller('listCtrl', function ($scope, $rootScope, $modal, postService, userService, $filter, $stateParams, $sce, $http) {

  $scope.carouselItems = [];
  $scope.modalLoaded = false;
  $scope.shareActive = false;
  $scope.selectedCompany = postService.getSelectedCompany;
  $scope.rawVideoUrl = '';
  $scope.companySubmitted = postService.getCompanySubmitted;
  $scope.donation = {
    mode: false,
    amount: 10
  };

  $scope.whereAmI = 'list controller';

  $scope.user = userService.user;
  $scope.emails = userService.startupOwnerEmails;
  $scope.param = $stateParams;

  $scope.switchView = function(view) {
    switch (view) {
      case 'education':
        $scope.educationView = true;
        $scope.investingView = false;
        $scope.comingSoonView = false;
        $rootScope.currentView = 'educationView';
      break;
      case 'investing':
        $scope.investingView = true;
        $scope.comingSoonView = false;
        $scope.educationView = false;
        $rootScope.currentView = 'investingView';
      break;
      case 'comingSoon':
        $scope.comingSoonView = true;
        $scope.investingView = false;
        $scope.educationView = false;
        $rootScope.currentView = 'comingSoonView';
      break;
      default:
    }
  };

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
    } else {
      $scope.currentView = 'educationView';
    }
  });

  // login prompt
  $scope.loginPrompt = function(){
    postService.loginPrompt();
  };
  // setting filter with an object
  $scope.setFilter = function(value){
    $scope.sortField = value;
  };
  $scope.myValueFunction = function(item) {
    return item.upVotes.value + item.facebookVotes.value + item.twitterVotes.value;
  };
  $scope.showPostModal = function (company) {
    $scope.modalLoaded = false;
    $scope.selectedCompany = company;
    $scope.carouselItems = [];

    if(company.video){
      $scope.carouselItems.push({
        type:'video',
        url: $sce.trustAsHtml(company.video)
      });
    }
    if(company.logo){
      $scope.carouselItems.push({
        type:'photo',
        url:company.logo.url
      });
    }
    if(company.attachments){
      for (var i = company.attachments.length - 1; i >= 0; i--) {
        $scope.carouselItems.push({
          type:'photo',
          url:company.attachments[i].url
        });
      }
    }
    $("#modal").modal({backdrop: 'static', keyboard: false});


    $scope.donation.mode = false;
    $scope.shareActive = false;
    $scope.slickConfig = {
      enabled: true,
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      autoplay: true,
      autoplaySpeed: 3000
    };

    setTimeout(function() {
      $scope.modalLoaded = true;
      $scope.$digest();
    }, 300);
  };

  $scope.hideCompanyModal = function(){
    $scope.modalLoaded = false;
    $("#modal").modal('hide');
  };


  $scope.vote = function () {
    var user = userService.user;
    console.log(user);
    if('uuid' in user){
      var voted = false;
      //could be replaced with $indexFor but why not loop through data we already have instead of double fetching it
      angular.forEach(user.votes, function(vote, key){
        if($scope.selectedCompany.uuid === vote.companyId){
          voted = true;
        }
      });
      if(!voted){
        userService.addVoteForCompany($scope.selectedCompany.$id);
      } else{
        console.log('already voted');
      }
    } else{
      console.log('log in');
    }
  };

  $scope.donate = function () {
    angular.element('#stripeCheckout').triggerHandler('click');
  };

  $scope.getTotalScore = function (company) {
    var donated = (company.totalDonated) ? company.totalDonated : 0;
    var votes = (company.totalVotes) ? company.totalVotes : 0;
    var fb = (company.facebookShares) ? company.facebookShares : 0;
    var twitter = (company.twitterShares) ? company.twitterShares : 0;
    return (donated + votes + fb + twitter);
  };

  $scope.checkout = function(token){
    var body = {
      stripeToken: token.id,
      stripeEmail: token.email,
      amount: ($scope.donation.amount * 100),
      companyName: $scope.selectedCompany.name
    };

    $http({
      method: 'POST',
      url: 'https://hero.tylerslater.me/api/charge',
      headers: {'Content-Type': 'application/json'},
      data: body
    }).then(function (response) {
      console.log('RES', response);
    }, function (response) {
      console.log('ERR', response);
    });
    postService.adjustVotesAndDonations($scope.selectedCompany.$id, $scope.donation.amount);

    // Reset modal and variables
    $scope.donation.amount = 10;
    $scope.donation.mode = false;
    $scope.modalLoaded = false;
    $("#modal").modal('hide');
  };

  /* - - - - - - - - - - - - - - - - - - *\
  #OVERALL SCORE
  \* - - - - - - - - - - - - - - - - - - */

  $scope.showOverall = function (person, $event) {
    $('.showOverall').hide();
    $($event.target).nextAll('.showOverall').show();
  };


  /* - - - - - - - - - - - - - - - - - - *\
  #CREATE MODAL CREATION AND DISMISS
  \* - - - - - - - - - - - - - - - - - - */
  $scope.callCreateModal = function (e, view) {
    $("#createModal").modal('show'); // hack (should use angular-strap or anguar-ui)
  };

  $scope.cancelCreateModal = function(e){
    // console.log('you clicked to cancel');
    $("#createModal").modal('hide');
  };

  $scope.approveCompany = function (companyId) {
    postService.approveCompany(companyId);
  };


  // /* - - - - - - - - - - - - - - - - - - *\
  //     #NG-REPEAT RENDER FINISHED
  // \* - - - - - - - - - - - - - - - - - - */
  //     $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
  //         $('#list-container').mixItUp({
  //         animation: {
  //           animateChangeLayout: true,
  //           animateResizeTargets: true,
  //           duration: 500,
  //           effects: 'fade rotateZ(180deg) rotateX(180deg) scale(0.01)',
  //           easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
  //         },
  //         layout: {
  //           containerClass: 'list' //inital layout
  //         }
  //       });// HACK - removes empty block on links
  //            $('.item-modal .additional-links li:first-child').remove();
  //            $('.item').after(" ");
  //     });
});
