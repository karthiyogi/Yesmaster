 angular.module('starter.services', [])
  .service('LoaderService', function($rootScope, $ionicLoading) {
    return {
      show: function(template_msg) {
        if ($rootScope.isIOS) {
          var template = '<ion-spinner icon="ios"></ion-spinner><div>' + template_msg + '</div>';
        } else {
          var template = '<ion-spinner icon="ios"></ion-spinner><div>' + template_msg + '</div>';
        }
        $rootScope.loading = $ionicLoading.show({
          template: template,
          content: 'Loading...',
          animation: 'fade-in',
          showBackdrop: true,
          minWidth: 600,
          showDelay: 10
        });
      },
      hide: function() {
        $ionicLoading.hide();
      }
    }
  })