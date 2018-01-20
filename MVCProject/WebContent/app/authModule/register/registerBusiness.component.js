angular.module('authModule')
	.component('registerBusiness', {
		templateUrl: 'app/authModule/register/registerBusiness.component.html',
		controllerAs: 'vm',
		controller: function(authService, $location, $cookies){
			var vm = this; 
			vm.business = null;
			
			if (authService.isBus() == true) {
				var id = authService.getBusToken(); 
                $location.path('/business/' + id); 
			}
			
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
				var lat = $cookies.get('latitude'); 
				var long = $cookies.get('longitude'); 
				if (lat !== undefined && long !== undefined) {
					vm.business.contact.latitude = lat; 
					vm.business.contact.longitude = long; 
				}
				authService.registerBusiness(vm.business)
					.then(function (res) {
						var id = res.data.id;
						authService.setBusToken(res.data.id);
						$location.path('/business/' + id);
					}).catch(console.error); 
			}
			//helper methods
			vm.return = function () {
				vm.business = null; 
			}
	}
}); 