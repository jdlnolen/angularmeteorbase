Items = new Mongo.Collection("items");

if (Meteor.isClient) {

    angular.module('angularbase',['angular-meteor']);
    
    angular.module('angularbase',['angular-meteor', 'ui.router']);
    
    angular.module('angularbase').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);

      $stateProvider
        .state('items', {
          url: '/items',
            templateUrl: 'items-list.ng.html',
            controller: 'ItemsListCtrl'
        })
        .state('itemDetails', {
            url: '/items/:itemId',
            templateUrl: 'item-details.ng.html',
            controller: 'ItemDetailsCtrl'
        });

      $urlRouterProvider.otherwise("/items");
    }]);
    
    angular.module('angularbase').controller("ItemsListCtrl", ['$scope', '$meteor',
            function($scope, $meteor){

            $scope.items = $meteor.collection(Items);
                
            $scope.remove = function(item){
                $scope.items.splice( $scope.items.indexOf(item), 1 );
            };

    }]);
    
    angular.module('angularbase').controller("ItemDetailsCtrl", ['$scope', '$stateParams',
  function($scope, $stateParams){

    $scope.itemId = $stateParams.itemId;

}]);

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Items.find().count() === 0) {

      var items = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Can we please just for an evening not listen to dubstep.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];

      for (var i = 0; i < items.length; i++)
        Items.insert({name: items[i].name, description: items[i].description});

    }
   });
}
