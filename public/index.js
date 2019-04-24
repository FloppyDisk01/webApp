var Login = angular.module('Login', ['ngCookies']);

function loginController($scope, $http, $window, $cookies) {
  $scope.login = function() {
    var user = {
      userName : $scope.userName,
      password : $scope.password
    }
    $http.post('/login/', user)
    .success(function(cb) {
      $cookies['userName'] = user.userName
      console.log("on change de fenetre");
      $window.location.replace('/dossierListe.html');
    })
    .error(function(){
        console.log("Error");
    })
  }
  $scope.register = function() {
    var user = {
      userName : $scope.userName,
      password : $scope.password
    }
    $http.post('/createUser/', user)
    .success(function(cb) {
        console.log("connexion réussie");
    })
    .error(function(){
        console.log("Error");
    })
  }
}
