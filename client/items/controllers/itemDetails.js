 angular.module('angularbase').controller("ItemDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.item = $meteor.object(Items, $stateParams.itemId);

     var subscriptionHandle;
     $meteor.subscribe('items').then(function(handle) {
       subscriptionHandle = handle;
    });
      
      
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');  

    $scope.invite = function(user){
        $meteor.call('invite', $scope.item._id, user._id).then(
            function(data){
                console.log('success inviting', data);
            },
            function(err){
                console.log('failed', err);
            }
        );  
    };  
      
    $scope.canInvite = function (){
        if (!$scope.item)
            return false;
        return !$scope.item.public &&
        $scope.item.owner === Meteor.userId();
    };  
      
    $scope.$on('$destroy', function() {
      subscriptionHandle.stop();
    });
      
    $scope.map = {
        center: {
        latitude: 45,
        longitude: -73
    },
    zoom: 8,
    events: {
    click: function (mapModel, eventName, originalEventArgs) {
      if (!$scope.item)
        return;

      if (!$scope.item.location)
        $scope.item.location = {};

      $scope.item.location.latitude = originalEventArgs[0].latLng.lat();
      $scope.item.location.longitude = originalEventArgs[0].latLng.lng();
      //scope apply required because this event handler is outside of the angular domain
      $scope.$apply();
    }
  },
  marker: {
    options: { draggable: true },
    events: {
      dragend: function (marker, eventName, args) {
        if (!$scope.item.location)
          $scope.item.location = {};

        $scope.item.location.latitude = marker.getPosition().lat();
        $scope.item.location.longitude = marker.getPosition().lng();
      }
    }
  }
};
      
      
      
      
      
      
      

}]);
    
    



