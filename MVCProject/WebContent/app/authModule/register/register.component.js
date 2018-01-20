angular.module('authModule')
	.component('register', {
		templateUrl: 'app/authModule/register/register.component.html',
		controllerAs: 'vm',
		controller: function(authService, $location, $cookies, distanceMatrixService){
			var vm = this; 
			vm.user = null; 
			vm.error = null; 

			if (authService.isUser() == true) {
				var id = authService.getToken(); 
                $location.path('/user/' + id); 
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
				let c = vm.user.contact; 
                let address = c.address1.split(' ').join('+') + '+' + c.city + '+' + c.state + '+' + c.zipcode;
                distanceMatrixService.geocode(address).then(function(res){
                		let geometry = res.data.results.pop().geometry.location; 
                		
                		vm.user.contact.latitude = geometry.lat; 
                		vm.user.contact.longitude = geometry.lng; 
                		authService.register(vm.user).then(function (res) {
                			var id = res.data.id; 
                			console.log(res); 
                			authService.setToken(res.data.id); 
                			$location.path('/user/' + id);
                		}).catch(console.error); 
                }); 
                
                
			}
			//helper methods
			vm.return = function () {
				vm.user = null; 
			}
	}
}); 