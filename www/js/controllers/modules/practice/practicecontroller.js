angular.module('starter.controllers')
.controller('practiceCtrl', function($scope, $ionicModal, $timeout,$rootScope,$firebaseArray,$state,  $ionicViewService) {
  $scope.showtimeline =  false;
$scope.categories = ["Square Root", "Cube Root"];
$scope.rootvalues = ["5","10","15","20","25","30","35","40","45","50"];
$scope.questionvalues = ["5","10","15","20","25","30","40","50","60","70","80","90","100"];

$scope.showthis = 0;
console.log($scope.rootvalues)
console.log("prac");
init();

function init(){
$scope.changecategory =changecategory;
$scope.startquiz = startquiz;
$scope.selectTimer = selectTimer;
$scope.nextquestion =nextquestion;
$scope.prevquestion= prevquestion;
$scope.endexam = endexam;
}

function endexam(){
  console.log($scope.questions);
  $scope.$broadcast('timer-stopped', 0);
  $timeout.cancel(mytimeout);
  $ionicViewService.nextViewOptions({
 disableBack: true
});
  $state.go('app.result', {
          result: $scope.questions
        });
}

function nextquestion(){
  if($scope.showthis+1!= $scope.questions.length){
    console.log("ulla")
$scope.showthis =$scope.showthis+1;
if(($scope.showthis+1) == ($scope.questions.length)){
console.log("finished")
$scope.iscompleted =true;
}
console.log($scope.showthis)
}else{
  console.log($scope.questions);
  $scope.$broadcast('timer-stopped', 0);
  $timeout.cancel(mytimeout);
  $ionicViewService.nextViewOptions({
 disableBack: true
});
  $state.go('app.result', {
          result: $scope.questions
        });
}
}
function prevquestion(){
  if($scope.showthis!=0){
    $scope.showthis =$scope.showthis-1;
  }

// if(($scope.showthis+1) == ($scope.questions.length)){
// console.log("finished")
// $scope.iscompleted =true;
// }
console.log($scope.showthis)

}
var mytimeout = null; // the current timeoutID
// actual timer method, counts down every second, stops on zero
$scope.onTimeout = function() {
    if ($scope.timer === 0) {
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
        $scope.endexam();
        return;
    }
    $scope.timer--;
    mytimeout = $timeout($scope.onTimeout, 1000);
};
// functions to control the timer
// starts the timer
$scope.startTimer = function() {
    mytimeout = $timeout($scope.onTimeout, 1000);
    $scope.started = true;
};

// stops and resets the current timer
$scope.stopTimer = function(closingModal) {
    if (closingModal != true) {
        $scope.$broadcast('timer-stopped', $scope.timer);
    }
    $scope.timer = $scope.timeForTimer;
    $scope.started = false;
    $scope.paused = false;
    $timeout.cancel(mytimeout);
};
// pauses the timer
$scope.pauseTimer = function() {
    $scope.$broadcast('timer-stopped', $scope.timer);
    $scope.started = false;
    $scope.paused = true;
    $timeout.cancel(mytimeout);
};
// This function helps to display the time in a correct way in the center of the timer
$scope.humanizeDurationTimer = function(input, units) {
    // units is a string with possible values of y, M, w, d, h, m, s, ms
    if (input == 0) {
        return 0;
    } else {
        var duration = moment().startOf('day').add(input, units);

        var format = "";
        if (duration.hour() > 0) {
            format += "H[h] ";
        }
        if (duration.minute() > 0) {
            format += "m[m] ";
        }
        if (duration.second() > 0) {
            format += "s[s] ";
        }
        // console.log(duration.format(format))
        return duration.format(format);
    }
};
// triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
$scope.$on('timer-stopped', function(event, remaining) {
    if (remaining === 0) {
        $scope.done = true;
    }
});
 function selectTimer(val) {
    $scope.timeForTimer = val;
    $scope.timer = val
    $scope.started = false;
    $scope.paused = false;
    $scope.done = false;
    $scope.startTimer();
};
function startquiz(data){
$scope.questions = [];
for(var i = 0; i<data.questions; i++){
  var question = {};
  if(data.category == "Square Root"){
    question.firstnum = _.random(1, data.uptovalue);
    question.operation = "squareroot";
    question.answer = question.firstnum * question.firstnum;
$scope.questions.push(question)
}else if(data.category == "Cube Root"){
    question.firstnum = _.random(1, data.uptovalue);
    question.operation = "cuberoot";
    question.answer = question.firstnum * question.firstnum * question.firstnum;
$scope.questions.push(question)
}
console.log($scope.questions)

  }
  console.log(data)
    $scope.totalTimer = data.questions* 5;
    console.log(  $scope.totalTimer );
    $scope.selectTimer( $scope.totalTimer)
    $scope.showtimeline =  true;

}
function changecategory(){


  console.log("yes")
}
})
