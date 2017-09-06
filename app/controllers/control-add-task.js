"use strict";

/*

    provide the data and functionality to handle the creation of new tasks
    using todoFactory to write to the database

 */

app.controller("addTaskCtrl", function($scope, todoFactory, $location, userFactory){

    const vm = $scope;

    // bund some values to scope to customize the form
    vm.title = "New Task";
    vm.submitButtonText = "Add New Task";

    const user = userFactory.getCurrentUser();

    // gather data from form to send to db
    vm.task = {
        assignedTo: "",
        dependencies: "",
        dueDate: "",
        urgency: "",
        task: "",
        isCompleted: false,
        location: "",
        uid: user
    };


    // call factory to add vm.task to db
    // then use $location to set url to 'task-list'
    vm.submitTask = function(){
        todoFactory.addTask(vm.task);
            $location.url('/task-list');
    };



});