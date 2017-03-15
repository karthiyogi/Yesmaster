angular.module('starter.controllers', ['firebase','ngMaterial'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope) {

  $rootScope.docsSearchBar = false;
  $scope.toggleDocsSearchBar = function() {
      $rootScope.docsSearchBar = !$rootScope.docsSearchBar;
  }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
