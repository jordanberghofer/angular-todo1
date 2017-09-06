"use strict";

/*
    
    handle data for detail view

 */

app.controller("detailTaskCtrl", function($scope, $routeParams, todoFactory){

    const vm = $scope;


    const showTask = function(){
        todoFactory.getSingleTask($routeParams.itemId)
            .then(task=> {
                vm.task = task;
                vm.task.id = $routeParams.itemId;
            });
    }();


});