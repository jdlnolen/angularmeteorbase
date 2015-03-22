angular.module('angularbase').controller("ItemsListCtrl", ['$scope', '$meteor', '$rootScope',
            function($scope, $meteor, $rootScope){

            $scope.page = 1;
            $scope.perPage = 10;
            $scope.sort = { name: 1 };
            $scope.orderProperty = '1';
                                                           
            $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

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
                                                           
            $scope.getUserById = function(userId){
                return Meteor.users.findOne(userId);
            };

            $scope.creator = function(item){
                if (!item)
                    return;
                var owner = $scope.getUserById(item.owner);
                if (!owner)
                    return "nobody";
                if ($rootScope.currentUser)
                    if ($rootScope.currentUser._id)
                        if (owner._id === $rootScope.currentUser._id)
                            return "me";
                return owner;
            };                                               
                                                           
            $scope.rsvp = function(partyId, rsvp){
                $meteor.call('rsvp', partyId, rsvp).then(
                    function(data){
                        console.log('success responding', data);
                    },
                    function(err){
                        console.log('failed', err);
                    }
                );
            };
                
            $scope.outstandingInvitations = function (party) {
                return _.filter($scope.users, function (user) {
                    return (_.contains(party.invited, user._id) && !_.findWhere(party.rsvps, {user: user._id}));
                });
            };    
    }]);