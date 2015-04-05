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
      
      

}]);
    
    



