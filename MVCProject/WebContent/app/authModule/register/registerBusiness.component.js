angular.module('authModule')
	.component('registerBusiness', {
		templateUrl: 'app/authModule/register/registerBusiness.component.html',
		controllerAs: 'vm',
		controller: function(authService, $location, $cookies, distanceMatrixService){
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
				
                let b = vm.business.contact; 
                let address = b.address1.split(' ').join('+') + '+' + b.city + '+' + b.state +'+' +  b.zipcode; 
                distanceMatrixService.geocode(address).then(function(res){
                		let obj = res.data.results.pop().geometry.location
                		
                		vm.business.contact.latitude = obj.lat;
                		vm.business.contact.longitude = obj.lng;
                		
                		
                		authService.registerBusiness(vm.business)
                		.then(function (res) {
                			var id = res.data.id;
                			console.log(res.data); 
                			authService.setBusToken(res.data.id);
                			$location.path('/business/' + id);
                		}).catch(console.error); 
                }); 
                
			}
			//helper methods
			vm.return = function () {
				vm.business = null; 
			}
	}
}); 