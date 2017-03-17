angular.module('starter.controllers')
.controller('resultCtrl', function($scope, $ionicModal, $timeout,$rootScope,$firebaseArray,$state,$ionicViewService) {

  $scope.finalresult = $state.params.result;
  console.log(  $scope.finalresult )
  $ionicViewService.nextViewOptions({
 disableBack: true
});
$scope.endresult = [];
$scope.correct = {
  label: "Questions Correct",
    value: 0
};
$scope.wrong = {
  label: "Questions Wrong",
    value: 0
};
$scope.unanswered = {
  label: "Questions UnAswered",
    value: 0
};
var operation="";
  _.forEach($scope.finalresult, function(value) {
operation=value.operation;
if(value.myanswer==undefined){
$scope.unanswered.value = $scope.unanswered.value+ 1;
}else if(value.myanswer == value.answer){
$scope.correct.value = $scope.correct.value+ 1;
}else{
  $scope.wrong.value = $scope.wrong.value+ 1;
}
  });




  $scope.myDataSource = {
      chart: {
          caption: "Result of the test",
          subCaption: operation,
          // numberPrefix: "$",
          theme: "ocean"
      },
      data:[$scope.correct,$scope.wrong,$scope.unanswered]
  };
});
