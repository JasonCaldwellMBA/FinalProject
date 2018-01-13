angular.module('authModule')
	.component('registerBusiness', {
		templateUrl: 'app/authModule/register/registerBusiness.component.html',
		controllerAs: 'vm',
		controller: function(authService, $location){
			var vm = this; 
			vm.business = null; 
			vm.setBusiness = function (bus) {
				if (bus.loginPassword !== bus.confirm) {
					return; 
				}
				delete bus.confirm; 
				bus.active = true; 
				vm.business = bus; 
			}
			vm.addContact = function (contact) {
				contact.active = true; 
				vm.business.contact = contact; 
				vm.addRating();
				vm.addLaborRate();
				vm.registerBusiness(); 
			}
			vm.addRating = function () {
				//default values for db
				vm.business.rating = {
					rating: 5.0
				}; 
			}
			vm.addLaborRate = function () {
				//default values for db
				vm.business.laborRate = 20;
			}
			vm.registerBusiness = function () {
				authService.registerBusiness(vm.business)
					.then(function (res) {
						$location.path('/home');
					}).catch(console.error); 
			}
			//helper methods
			vm.return = function () {
				vm.business = null; 
			}
	}
}); 