'use strict';

angular.module('core').directive('updateTitle', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function(scope, element) {

        var listener = function(event, toState, $stateParams) {

          var title = 'Sense Forage';
          if (toState.data && toState.data.pageTitle) title = title + ' - ' + toState.data.pageTitle;
          if ($stateParams.productSlug) {
            var subtitle = $stateParams.productSlug.split('-').join(' ');
            title = title + ' - ' + subtitle;
            }

          $timeout(function() {
            element.text(title);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
