angular.module('starter.controllers')
.controller('CurrentaffairCtrl', function($scope, $ionicModal, $timeout,$rootScope,$firebaseArray) {
  $scope.orderbydata= "categorytype";
  var allcurrentaffairdata = "";
  var allcategorydata = "";
  $scope.years = ["2016","2017","2018"];
  $scope.months = [ "January","February","March","April","May","June","July","August","September","October","November","December"];
  $scope.priorities = ["high","medium","low"];
  $scope.data = {
"year" :   $scope.years,
"month" : $scope.months,
"priority":$scope.priorities,
"categorytype" :"All",
// "subcategorytype":$scope.subcategories


  };
$scope.showtimeline = true;
$scope.subcategories = [];
init();
  $scope.toggleAll = function() {
if($scope.data.subcategorytype == undefined || ($scope.data.subcategorytype.length < $scope.subcategories.length)){
$scope.data.subcategorytype = $scope.subcategories;
}else if($scope.data.subcategorytype.length === $scope.subcategories.length){
  $scope.data.subcategorytype = [];
}
  };
  function toggleAllmonth(){
    if($scope.data.month == undefined || ($scope.data.month.length < $scope.months.length)){
    $scope.data.month = $scope.months;
    }else if($scope.data.month.length === $scope.months.length){
      $scope.data.month = [];
    }
  }
function toggleAllyear(){
  if($scope.data.year == undefined || ($scope.data.year.length < $scope.years.length)){
  $scope.data.year = $scope.years;
  }else if($scope.data.year.length === $scope.years.length){
    $scope.data.year = [];
  }
}
$scope.allSubCategory = function(dd){
if($scope.data.subcategorytype==undefined || ($scope.data.subcategorytype.length < $scope.subcategories.length)){
$scope.data.subcategorytype = $scope.subcategories;
}else if($scope.data.subcategorytype.length > $scope.subcategories.length){
  $scope.data.subcategorytype = [];
}
}
function init(){
  initializeData();
  $scope.toggle = toggle;
  $scope.search = search;
  $scope.changesort = changesort;
  $scope.changeSubcategory = changeSubcategory;
  $scope.toggleAllmonth =toggleAllmonth;
  $scope.toggleAllyear =toggleAllyear;
}
function changesort(data){
$scope.orderbydata =data;
}
function changeSubcategory(type){
$scope.data.subcategorytype = []
if(type != "All"){
$scope.subcategories = $scope.categories[type];
}else{
      getallsubcategory();
}
}
function search(data){
  $scope.currentaffairs = allcurrentaffairdata;
  _.forEach(data, function(value, key) {

    if(key== "categorytype" && value == "All"){
      value = $scope.categories.allcategories;
    }
    if(_.isArray(value)==false){
 $scope.currentaffairs = _.filter(  $scope.currentaffairs, [key, value]);
 }else{
  // var arr =  _.split(value, ",");
  if(value.length>0){
  var currdata = $scope.currentaffairs;
  $scope.currentaffairs = [];
  _.forEach(value, function(val) {
$scope.currentaffairs= _.concat($scope.currentaffairs,_.filter(currdata, [key, val]) );
  })
}
 }

});
$scope.showtimeline =!$scope.showtimeline;
}
function initializeData(){
var currentaffairsdata = firebase.database().ref('currentaffairs');
currentaffairsdata.on('value', function(snapshot) {
  $scope.currentaffairs = snapshot.val();
allcurrentaffairdata= snapshot.val();
  $scope.$apply();
});
var categorydata = firebase.database().ref('category');
	categorydata.on('value', function(snapshot) {
		$scope.categories = snapshot.val();
    allcategorydata = snapshot.val();
    $scope.$apply();
	});
}

function toggle(){
$scope.showtimeline =!$scope.showtimeline;
if($scope.subcategories && $scope.subcategories.length==0){
  getallsubcategory();
  $scope.data.subcategorytype =$scope.subcategories;
}
}
function getallsubcategory(){
$scope.subcategories = [];
  _.forEach(allcategorydata, function(value, key) {
    if(key != "allcategories"){
$scope.subcategories =  _.concat($scope.subcategories, allcategorydata[key]);
  }
});
$scope.subcategories = _.uniq($scope.subcategories);
}
})
