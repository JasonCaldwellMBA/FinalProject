angular.module('authModule')
    .component('login', {
        templateUrl: 'app/authModule/login/login.component.html',
        controllerAs: 'vm',
        controller: function (authService, $location) {
            var vm = this; 
            vm.user = null; 
            vm.login = function () {
				authService.login(vm.user)
					.then(function (res) {
						$location.path('/home');
					}).catch(console.error); 
            }
            vm.setUser = function (user) {
                authService.login(user)
                    .then(function (res) {
                        console.log(res); 
                        $location.path('/home'); 
                })
            }
        }
    }); 