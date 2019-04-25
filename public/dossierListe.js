// public/core.js
var ListeaFaire = angular.module('ListeaFaire', ['ngCookies']);

function folderControler($scope, $http, $cookies, $window) {
    $scope.formData = {};
    $scope.user = $cookies.userId;

    // when landing on the page, get all todos and show them
    $http.get('/api/getList/' + $scope.user)
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
      $http.post('/api/createList/'+ $scope.user, $scope.formData)
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
        $http.delete('/api/deleteList/' + user + '/' + listId)
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
      $http.put('/api/modifyList', list)
          .success(function(data) {
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    };

    $scope.accessList = function(list) {
        $cookies.idListe = list;
        console.log("on change de fenetre");
        $window.location.replace('/liste.html');
    };
}
