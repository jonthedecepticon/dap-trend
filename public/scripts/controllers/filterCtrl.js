'use strict';

angular.module('trendrr')
  .controller('FilterCtrl', function ($scope) {
    
    var ButtonsCtrl = function ($scope) {
      $scope.singleModel = 1;

      $scope.radioModel = 'Middle';

      $scope.checkModel = {
        left: false,
        middle: true,
        right: false
      };
    };
  });
