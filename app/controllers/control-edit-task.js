"use strict";

/*
    
    handle data and provide functionality to edit a task

 */

app.controller("editTaskCtrl", function($scope, todoFactory, $routeParams, $location){

    const vm = $scope;

    // bind a few values to scope
    vm.title = "Edit Task";
    vm.submitButtonText ="Edit Item";
    vm.task = {

        assignedTo: "",
        dependencies: "",
        dueDate: "",
        urgency: "",
        task: "",
        isCompleted: "",
        location: ""

    };

    // display the details of a given task in form.html
    // invoke from details view when the 'edit' button is clicked
    const showEditTask = function(){
        todoFactory.getSingleTask($routeParams.itemId)
            .then(data => {
                console.log("data", data);
                vm.task = data;
                vm.task.id = $routeParams.itemId;
            });
    };

    // edit task
    // using location to redirect
    vm.submitTask = function(){
        todoFactory.editTask($routeParams.itemId, vm.task)
            .then(data => $location.path('/task-list'));
    };

    showEditTask();

});