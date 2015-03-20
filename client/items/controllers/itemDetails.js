 angular.module('angularbase').controller("ItemDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.item = $meteor.object(Items, $stateParams.itemId);

     var subscriptionHandle;
     $meteor.subscribe('items').then(function(handle) {
       subscriptionHandle = handle;
    });
      
      
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');  

    $scope.$on('$destroy', function() {
      subscriptionHandle.stop();
    });

}]);
    
    



