'use strict';

angular.module('core').directive('updateTitle', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState) {

          var title = 'Sense Forage';
          if (toState.data && toState.data.pageTitle) title = title + ' - ' + toState.data.pageTitle;
          console.log(toState);

          $timeout(function() {
            element.text(title);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
