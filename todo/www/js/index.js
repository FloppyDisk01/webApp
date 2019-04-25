var srv = "http://poly-todo.herokuapp.com";

angular.module('starter.controllers', [])

.controller('loginController', ['$window','$http','$scope', '$state', function($window,$scope,$state){
    $state.go('dossierListe');
    $scope.userName = "bite";
    $scope.login = function() {
      var user = {
        userName : $scope.userName,
        password : $scope.password
      }
      $http.post(srv + '/login/', user)
      .success(function(cb) {
        $window.localStorage.setItem('user', user.userName);
        $state.go('dossierListe')
      })
      .error(function(){
          console.log("Error");
      })
    },

    $scope.register = function() {
      var user = {
        userName : $scope.userName,
        password : $scope.password
      }
      $http.post(srv + '/createUser/', user)
      .success(function(cb) {
          console.log("connexion réussie");
      })
      .error(function(){
          console.log("Error");
      })
    }
}])

.controller('folderController', ['$window','$http','$scope', '$state', function($window,$scope,$state,connectionFactory) {
    $scope.formData = {};
    $scope.user = $window.localStorage.getItem('user');

    // when landing on the page, get all todos and show them
    $http.get(srv + '/api/getList/' + $scope.user)
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
        $scope.formData.auth = $scope.user;
      }
      $scope.formData.user = $scope.user;
      $http.post(srv + '/api/createList/'+ $scope.user, $scope.formData)
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
    $scope.deleteList = function(user, listId) {
      console.log("on tente de supprimer");
        $http.delete(srv + '/api/deleteList/' + user + '/' + listId)
            .success(function(data) {
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //modify a list
    $scope.modifyList = function(list){
      $http.put(srv + '/api/modifyList', list)
          .success(function(data) {
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    };

    $scope.accessList = function(list) {
        $window.localStorage.setItem('listId', list);
        console.log("on change de fenetre");
        $state.go('liste');
    };
}])

.controller('mainController',['$window','$scope', '$state', function($window,$scope,$state){
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
