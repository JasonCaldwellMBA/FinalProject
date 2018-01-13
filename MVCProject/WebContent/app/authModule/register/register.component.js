angular.module('authModule')
	.component('register', {
		templateUrl: 'app/authModule/register/register.component.html',
		controllerAs: 'vm',
		controller: function(authService, $location){
			var vm = this; 
			vm.user = null; 
			vm.setUser = function (user) {
				user.active = true; 
				vm.user = user; 
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
						$location.path('/home');
					}).catch(console.error); 
			}
			vm.login = function () {
				authService.login(vm.user)
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