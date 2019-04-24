var todoApp = angular.module('todoApp', []);
todoApp.controller('todoCtrl', ['$scope', function($scope){

    $scope.taskSet = [
        {
            taskName: 'faire le ménage',
            done: false
        },
        {
            taskName: 'faire la vaisselle',
            done: false
        }

    ];

    $scope.addTask = function(){
        if($scope.taskName != ''){
            $scope.taskSet.push({
                taskName: $scope.taskName,
                done: false
            })
        };

        $scope.taskName = '';
    }

    $scope.removeTodo = function (todo) {
        $scope.taskSet.splice($scope.taskSet.indexOf(todo), 1);
    };

    $scope.markAll = function (completed) {
        $scope.taskSet.forEach(function (todo) {
            todo.completed = !completed;
        });
    };

    $scope.clearCompletedTodos = function () {
        $scope.taskSet = $scope.taskSet.filter(function (todo) {
            return !todo.completed;
        });
    };
}]);