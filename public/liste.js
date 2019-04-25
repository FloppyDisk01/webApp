
var ListeaFaire = angular.module('ListeaFaire', ['ngCookies']);

function mainController($scope, $http, $cookies) {
    $scope.formData = {};
    $scope.parent = $cookies.idListe;
    // when landing on the page, get all todos and show them
    $http.get('/api/getTask', $scope.parent)
        .success(function(data) {
            $scope.laliste = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
      if(!($scope.formData.auth)){
        $scope.formData.auth = "inconnu";
      }
      $scope.formData.parent = $scope.parent;
      $http.post('/api/createTask', $scope.formData)
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
    $scope.deleteTodo = function(id) {
        $http.delete('/api/deleteTask/' + id)
            .success(function(data) {
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //modify a task
    $scope.modifyTask = function(task){
      $http.put('/api/modifyTask', task)
          .success(function(data) {
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    };
}
