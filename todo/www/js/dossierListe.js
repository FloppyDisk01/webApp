// public/core.js

monApp.controller('folderController', ['$window','$http','$scope', '$state', function($window,$scope,$state,connectionFactory) {
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
}]);
