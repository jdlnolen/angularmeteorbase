angular.module('angularbase',['angular-meteor', 'ui.router', 'angularUtils.directives.dirPagination', 'uiGmapgoogle-maps']);

function onReady() {
  angular.bootstrap(document, ['angularbase']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
   
    
    
    
   