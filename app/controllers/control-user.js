"use strict";

/*
    this controller is instantiated when the 'user.html' template 
    is rendered at the '/login' path.
    it uses the userFactory to handle the registration of new users, login with google or email and password.

 */

app.controller("userCtrl", function($scope, $window, userFactory, $location){

    const vm = $scope;

    // this will hold user's email and password
    vm.account = {};

    // called when the 'register' button is clicked.
    // form data is gathered and sent to userFactory and our register method
    // passes it off to firebase
    vm.register = function(){
        userFactory.register({
            email: vm.account.email,
            password: vm.account.password
        })
        .then(userData => {
            vm.logIn();
        })
        .catch(error => console.log("error with login", error));
    };

    vm.logIn = () => userFactory.logIn(vm.account)
                                .then($window.location.href = '#!/task-list');

    vm.loginGoogle = function(){
        userFactory.authWithProvider()
            .then(result => {
                let user = result.user.uid;
                $location.path('/task-list');
                vm.$apply();
            })
            .catch(error => console.log("google login error", error.message, error.code));
    };


});