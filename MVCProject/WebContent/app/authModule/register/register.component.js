angular.module('authModule')
	.component('register', {
		templateUrl: 'app/authModule/register/register.component.html',
		controllerAs: 'vm',
		controller: function(authService, $location){
			var vm = this; 
			vm.user = null; 
			vm.setUser = function(user) {
				vm.user = user; 
			}
			vm.addContact = function (contact) {
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
				authService.userRegister(vm.user)
					.then(function (res) {
						$location.path('/home');
					}).catch(console.error); 
			}
			//helper methods
			vm.return = function () {
				vm.user = null; 
			}
	}
}); 