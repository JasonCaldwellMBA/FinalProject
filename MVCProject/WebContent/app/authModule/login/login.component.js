angular.module('authModule')
    .component('login', {
        templateUrl: 'app/authModule/login/login.component.html',
        controllerAs: 'vm',
        controller: function (authService, $location, $cookies) {
            var vm = this; 
			if (authService.isUser() == true) {
				var id = authService.getToken(); 
                $location.path('/user/' + id); 
			}
            vm.setUser = function (user) {
                authService.login(user)
                    .then(function (res) {
                    	console.log(res);
                    	console.log(res.data.id); 
                    	if(authService.setToken(res.data.id)){
                    		$location.path('/user/' + authService.getToken()); 
                    	}
                    	return; 
                }); 
            }
        }
    }); 