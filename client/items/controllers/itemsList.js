angular.module('angularbase').controller("ItemsListCtrl", ['$scope', '$meteor',
            function($scope, $meteor){

            $scope.items = $meteor.collection(Items);
                
            $scope.remove = function(item){
                $scope.items.splice( $scope.items.indexOf(item), 1 );
            };

    }]);