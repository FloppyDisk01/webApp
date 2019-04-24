// public/core.js
var ListeaFaire = angular.module('ListeaFaire', ['ngCookies']);

function mainController($scope, $http, $cookies) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/getListSet')
        .success(function(data) {
            $scope.laliste = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createList = function() {
      if(!($scope.formData.auth)){
        $scope.formData.auth = "inconnu";
      }
        $http.post('/api/createListSet', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteList = function(id) {
        $http.delete('/api/deleteListSet/' + id)
            .success(function(data) {
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //modify a task
    $scope.modifyList = function(task){
      $http.put('/api/modifyList', task)
          .success(function(data) {
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    };
}
