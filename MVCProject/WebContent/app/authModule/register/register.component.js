angular.module('authModule')
	.component('register', {
		templateUrl: 'app/authModule/register/register.component.html',
		controllerAs: 'vm',
		controller: function(authService, $location){
			var vm = this; 
			vm.user = null; 
			vm.error = null; 

			if (authService.isUser() == true) {
                $location.path('/home'); 
			}
			
			vm.setUser = function (user) {
				if (user.password === user.confirm) {
                    delete user.confirm; 
                    vm.error = null; 
					user.active = true; 
					vm.user = user; 
				}
				else {
					vm.error = "passwords do not match"; 
				}
			}
			vm.addContact = function (contact) {
				contact.active = true; 
				vm.user.contact = contact; 
				vm.addRating();
				vm.registerUser(); 
			}
			vm.addRating = function () {
				//default values for db
				vm.user.rating = {
					rating: 5.0
				}; 
			}
			vm.registerUser = function () {
				authService.register(vm.user)
					.then(function (res) {
                        authService.setToken(res.data.id); 
						$location.path('/home');
					}).catch(console.error); 
			}
			//helper methods
			vm.return = function () {
				vm.user = null; 
			}
	}
}); 