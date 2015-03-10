angular.module('angularbase',['angular-meteor', 'ui.router']);

function onReady() {
  angular.bootstrap(document, ['angularbase']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
   
    
    
    
   