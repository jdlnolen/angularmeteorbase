Items = new Mongo.Collection("items");

if (Meteor.isClient) {

    angular.module('angularbase',['angular-meteor']);

    angular.module('angularbase').controller("ItemsListCtrl", ['$scope', '$meteor',
            function($scope, $meteor){

            $scope.items = $meteor.collection(Items);
                
            $scope.remove = function(item){
                $scope.items.splice( $scope.items.indexOf(item), 1 );
            };

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
