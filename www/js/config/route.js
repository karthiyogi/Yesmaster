angular.module('starter')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.currentaffairtimeline', {
    url: '/currentaffairtimeline',
    views: {
      'menuContent': {
        templateUrl: 'templates/modules/currentaffairtimeline.html',
        controller : 'CurrentaffairCtrl'
      }
    }
  })
  .state('app.yeartimeline', {
    url: '/yeartimeline',
    views: {
      'menuContent': {
        templateUrl: 'templates/modules/years/yeartimeline.html',
        controller : 'yearCtrl'
      }
    }
  })  .state('app.practice', {
      url: '/practice',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/modules/practice/practice.html',
          controller : 'practiceCtrl'
        }
      }
    })
    .state('app.result', {
       url: '/result',
       cache:false,
       params: {
      result: null
    },
       views: {
         'menuContent': {
           templateUrl: 'templates/modules/practice/result.html',
           controller : 'resultCtrl',

         }
       }
     });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/yeartimeline');
});
