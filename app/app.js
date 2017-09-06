"use strict";

// instatiate the module as 'app'
const app = angular.module("TodoApp", ['ngRoute']);

// is user logged in?
// this is checked as the 'resolve' in most views
// the resolve is an optional map of dependencies if they are resolved successfully,
// they will be injected when the controller is instantiated, and are available to $scope in that controller under $resolve.
// else a $routeChangeError will be fired
// in this case, we need to know if the user is logged in to determine whether to allow access to certain paths
const isAuth = (userFactory) => userFactory.isAuthenticated();

// using $routeProvider to configure the routes
// the .when specifies the the template, controller, and the resolve (see above)
// to be instantiated when the path is requested
app.config(($routeProvider)=> {
    $routeProvider 
    .when('/', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl',
        resolve: {isAuth}
    })
    .when('/login', {
        templateUrl: 'partials/user.html',
        controller: 'userCtrl'
    })
    .when('/task-list', {
        templateUrl: 'partials/list.html',
        controller: 'listCtrl',
        resolve: {isAuth}

    })
    .when('/item/newItem', {
        templateUrl: 'partials/form.html',
        controller: 'addTaskCtrl',
        resolve: {isAuth}

    })
    .when('/task/:itemId', {
        templateUrl: 'partials/details.html',
        controller: 'detailTaskCtrl',
        resolve: {isAuth}

    })
    .when('/task/:itemId/edit', {
        templateUrl: 'partials/form.html',
        controller: 'editTaskCtrl',
        resolve: {isAuth}

    })
    .otherwise('/');
});

// .run blocks - A run block is the code which needs to run to kickstart the application. 
// It is executed after all of the service have been configured and the injector has been created
// here we are just initializing our app with firebase, passing 'FRCreds', a constant registered in app/fb-creds.js
// which contains the databaseURL, apiKey, and authDomain need to interact with the app
app.run(($location, FBCreds)=> firebase.initializeApp(FBCreds));

// binding this value to rootscope is not necessary
// but we are just taking this opportunity to illustrate the fact that you can.
app.run(($rootScope)=> $rootScope.showSearch = false);