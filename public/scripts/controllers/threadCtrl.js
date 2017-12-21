'use strict';

angular.module('trendrr')
  .controller('threadCtrl', function ($scope) {

      // console.log('you got inside the thread controller');
      var threadFromView = $scope.threadFromView;

    $scope.threadCreate = function (threadFromView){
      //   console.log('thread from View: '+ threadFromView);
      // var dataBase = new Firebase ('https://trendrr-8f523.firebaseio.com/people/1');
      // dataBase.set(location: ""
      //   {
              
      //   }
        
      // );
    };

      //   var PeopleParseTable = Parse.Object.extend("peopleTable");
      //   var peopleParseTable = new PeopleParseTable();
      //   peopleParseTable.save({thread: threadFromView}).then(function(object) {
      //     alert("yay! it worked");
      //   });
      // };



});
