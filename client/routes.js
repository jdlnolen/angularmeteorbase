 angular.module('angularbase').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);

      $stateProvider
        .state('items', {
          url: '/items',
            templateUrl: 'client/items/views/items-list.ng.html',
            controller: 'ItemsListCtrl'
        })
        .state('itemDetails', {
            url: '/items/:itemId',
            templateUrl: 'client/items/views/item-details.ng.html',
            controller: 'ItemDetailsCtrl'
        });

      $urlRouterProvider.otherwise("/items");
    }]);