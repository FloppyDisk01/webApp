var counterApp = angular.module('counterApp', []);

counterApp.controller("counterSavedCtrl", ['$scope', function($scope){
    $scope.load = function(){
        $scope.count = localStorage.getItem("count");
    };

    $scope.increment = function(){
        $scope.count++;
        localStorage.setItem("count", $scope.count);
    };

    $scope.load();
}]);