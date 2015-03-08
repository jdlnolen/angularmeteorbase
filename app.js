if (Meteor.isClient) {
  angular.module('angularbase',['angular-meteor']);
 
  angular.module("angularbase").controller("ItemsListCtrl", ['$scope',
      function($scope){

        $scope.items = [
          {'name': 'item 1',
            'description': 'this is item 1'},
          {'name': 'item 2',
            'description': 'this is item 2'},
          {'name': 'item 3',
            'description': 'this is item 3'}
        ];

     }]);   

}

