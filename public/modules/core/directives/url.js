'use strict';

angular.module('core').directive('updateUrl', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState) {

          var url = 'Default Url';
          if (toState.data && toState.data.url) url = toState.data.url;

          $timeout(function() {
            element.text(url);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
