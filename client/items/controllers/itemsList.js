angular.module('angularbase').controller("ItemsListCtrl", ['$scope', '$meteor',
            function($scope, $meteor){

            $scope.page = 1;
            $scope.perPage = 10;
            $scope.sort = { name: 1 };
            $scope.orderProperty = '1';

            $scope.items = $meteor.collection(function() {
                return Items.find({}, {
                    sort : $scope.getReactively('sort')
                });
            });

            $meteor.autorun($scope, function() {
                $meteor.subscribe('items', {
                    limit: parseInt($scope.getReactively('perPage')),
                    skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
                    sort: $scope.getReactively('sort') 
                }, $scope.getReactively('search')).then(function() {
                    $scope.itemsCount = $meteor.object(Counts ,'numberOfItems', false);
                });
            });

            $scope.pageChanged = function(newPage) {
                $scope.page = newPage;
            };
                
            $scope.remove = function(item){
                $scope.items.splice( $scope.items.indexOf(item), 1 );
            };
                
            $scope.$watch('orderProperty', function(){
                if ($scope.orderProperty)
                    $scope.sort = {name: parseInt($scope.orderProperty)};
            });

    }]);