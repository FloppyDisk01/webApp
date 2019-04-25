monApp.controller('mainController',['$window','$scope', '$state', function($window,$scope,$state){
    $scope.formData = {};
    $scope.parent = $window.localStorage.getItem('listId');
    $scope.nameDefault = $window.localStorage.getItem('user');
    // when landing on the page, get all todos and show them
    $http.post(srv + '/api/getTask/' + $scope.parent)
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
        $scope.formData.auth = $scope.nameDefault;
      }

      $scope.formData.parent = $scope.parent;
      $http.post(srv + '/api/createTask', $scope.formData)
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
    $scope.deleteTodo = function(ListId, TaskId) {
        $http.delete(srv + '/api/deleteTask/' + ListId + '/' + TaskId)
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
      $http.put(srv + '/api/modifyTask', task)
          .success(function(data) {
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    };
}]);
