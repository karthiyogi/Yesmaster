angular.module('starter.controllers')
.controller('yearCtrl', function($scope, $ionicModal, $timeout,$rootScope,$firebaseArray,$mdDialog,LoaderService) {
  init();
$scope.showtimeline = true;
$scope.makeallcolorblack = false;
$scope.orderbydata= "categorytype";
var   allcategorydata = "";
var yearsdata = "";
$scope.showperiod =true;
$scope.data = {
"categorytype" :"All",
};
$scope.deletethis = function(ev,item){
  var confirm = $mdDialog.confirm()
           .title('Would you like to delete this?')
           .textContent(item.brief)
           .ariaLabel('Lucky day')
           .targetEvent(ev)
           .ok('yes')
           .cancel('No');

     $mdDialog.show(confirm).then(function() {
       console.log(_.findIndex(yearsdata, {"brief":item.brief}));
        firebase.database().ref('years/'+_.findIndex(yearsdata, {"brief":item.brief})).set({"brief":"removed"});
       $scope.status = 'You decided to get rid of your debt.';
     }, function() {
       $scope.status = 'You decided to keep your debt.';
     });
  console.log(item)
}
$scope.subcategories = [];
function init(){
initializeData();
$scope.toggle= toggle;
$scope.changeSubcategory = changeSubcategory;
$scope.toggleAllyear = toggleAllyear;
$scope.changesort = changesort;
$scope.search = search;
$scope.addyear =addyear;
$scope.changecolor = changecolor;
}
function changecolor(){
$scope.makeallcolorblack = !$scope.makeallcolorblack;
// console.log("qwetry")
}
function toggle(){
  console.log("enter")
$scope.showtimeline =!$scope.showtimeline;
$scope.docsSearchBar = false;
if($scope.subcategories && $scope.subcategories.length==0){
  getallsubcategory();
  $scope.data.subcategorytype =$scope.subcategories;
}
}
function addyear(){
  console.log("enetre")
var options = {
    location: 'yes',
    clearcache: 'yes',
    toolbar: 'no'
  };
document.addEventListener("deviceready", function () {
  $cordovaInAppBrowser.open('https://yesmaster-7f364.firebaseapp.com/#/years', '_blank', options)
    .then(function(event) {
      // success
    })
    .catch(function(event) {
      // error
    });


  $cordovaInAppBrowser.close();

}, false);
}
$rootScope.docsSearchBar = false;
$scope.toggleDocsSearchBar = function() {
    $rootScope.docsSearchBar = !$rootScope.docsSearchBar;
}
function search(showperiod,data){
  console.log(data)
  $scope.currentaffairs = yearsdata;
  console.log($scope.currentaffairs)
  _.forEach(data, function(value, key) {
// console.log(value)
    if(key== "categorytype" && value == "All"){
      value = $scope.categories.allcategories;
    }
    console.log(key)
    if(showperiod && key =="year"){
// value=[];
console.log(key)
value= _.filter($scope.allyears, function(o) { return o>=value.fromyear && o<=value.toyear; });


    }
    if(_.isArray(value)==false){
 $scope.currentaffairs = _.filter(  $scope.currentaffairs, [key, value]);
 }else{
  // var arr =  _.split(value, ",");
  if(value.length>0){
  var currdata = $scope.currentaffairs;
  console.log(currdata)
  $scope.currentaffairs = [];
  _.forEach(value, function(val) {
    console.log(val);
$scope.currentaffairs = _.concat($scope.currentaffairs,_.filter(currdata, [key, val]) );
console.log($scope.currentaffairs);
  })
}
 }

});
$scope.showtimeline =!$scope.showtimeline;
}
function changesort(data){
$scope.orderbydata =data;
}
function toggleAllyear(){
  if($scope.data.year == undefined || ($scope.data.year.length < $scope.allyears.length)){
  $scope.data.year = $scope.allyears;
  }else if($scope.data.year.length === $scope.allyears.length){
    $scope.data.year = [];
  }
}
$scope.toggleAll = function() {
if($scope.data.subcategorytype == undefined || ($scope.data.subcategorytype.length < $scope.subcategories.length)){
$scope.data.subcategorytype = $scope.subcategories;
}else if($scope.data.subcategorytype.length === $scope.subcategories.length){
$scope.data.subcategorytype = [];
}
};
function changeSubcategory(type){
$scope.data.subcategorytype = []
if(type != "All"){
$scope.subcategories = $scope.categories[type];
}else{
      getallsubcategory();
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
console.log($scope.subcategories);
}
function initializeData(){
  LoaderService.show("Loading...");
var allyearsdata = firebase.database().ref('years');
allyearsdata.on('value', function(snapshot) {
  $scope.currentaffairs = snapshot.val();
yearsdata= snapshot.val();
console.log("yearsdata");
console.log(yearsdata)
$scope.allyears=[];
_.forEach(yearsdata, function(value, key) {
  // console.log(value)
$scope.allyears =  _.concat($scope.allyears, value.year);

// console.log(value)
});
$scope.allyears = _.uniq($scope.allyears);
console.log($scope.allyears)
LoaderService.hide();
if ($scope.$root && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
$scope.$apply();
}
});
var categorydata = firebase.database().ref('yearcategory');
	categorydata.on('value', function(snapshot) {
		$scope.categories = snapshot.val();
    allcategorydata = snapshot.val();
    if ($scope.$root && $scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
    $scope.$apply();
}
	});

}
})
