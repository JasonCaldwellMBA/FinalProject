angular.module('authModule')
    .component('login', {
        templateUrl: 'app/authModule/login/login.component.html',
        controllerAs: 'vm',
        controller: function (authService, $location, $cookies) {
            var vm = this; 
            vm.setUser = function (user) {
                authService.login(user)
                    .then(function (res) {
                    	console.log(res); 
                    	authService.setToken('userId', res.data.id); 
                    $location.path('/user/' + res.data.id); 
                }); 
            }
        }
    }); 