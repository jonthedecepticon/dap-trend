'use strict';
// ROUTING
angular.module('trendrr', [
  'ui.router',
  'ui.bootstrap',
  'firebase',
  // 'xeditable',
  // 'onFinishRenderDirective',
  'firebase',
  'slickCarousel',
  '720kb.socialshare',
  'stripe.checkout',
  'ngTouch',
  'ngTagsInput'
]).config(function ($stateProvider, $urlRouterProvider) {
  // UI ROUTER
  $urlRouterProvider.otherwise('/');

  var nav = {
    templateUrl: 'views/nav.html'
  };
  var createModal = {
    templateUrl: 'views/createModal.html',
    controller: 'listCtrl',
    // resolve: {
    //   user: function (userService) {
    //     return userService.get();
    //   },
    //   loggedInUser: function (userService) {
    //     return userService.getLoggedInUser();
    //   }
    // }
  };

  var body = {
    templateUrl: 'views/main.html',
    controller: 'listCtrl',
    // resolve: {
    //   user: function (userService) {
    //     return userService.get();
    //   },
    //   loggedInUser: function (userService) {
    //     return userService.getLoggedInUser();
    //   }
    // }
  };

  var footer = {
    templateUrl: 'views/footer.html',
    // controller: 'NavCtrl',
    // resolve: {
    //   user: function (userService) {
    //     return userService.get();
    //   },
    //   loggedInUser: function (userService) {
    //     return userService.getLoggedInUser();
    //   }
    // }
  };

  $stateProvider
  .state('root', {
    url: '/:selectedCompanyId',
    views: {
      body: body,
      footer: footer,
      createModal: createModal
    }
  })
  // .state('company', {
  //     url: "/:selectedCompanyId",
  //     views: {
  //         body: body,
  //         footer: footer,
  //         createModal: createModal
  //     }
  // })
  ;
});
