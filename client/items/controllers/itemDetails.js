 angular.module('angularbase').controller("ItemDetailsCtrl", ['$scope', '$stateParams', '$meteor',
  function($scope, $stateParams, $meteor){

    $scope.item = $meteor.object(Items, $stateParams.itemId, false);

    $scope.save = function() {
      $scope.item.save().then(function(numberOfDocs){
        console.log('save success doc affected ', numberOfDocs);
      }, function(error){
        console.log('save error', error);
      });
    };

    $scope.reset = function() {
      $scope.item.reset();
    };

}]);
    
    



