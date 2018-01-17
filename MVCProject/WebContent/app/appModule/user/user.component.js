angular.module('appModule')
.component('userComponent', {
	templateUrl : 'app/appModule/user/user.component.html',
	controllerAs : 'vm',
	controller : function($routeParams, $location, userService, businessService, requestService){
		var vm = this;
		vm.user = null;
		vm.activeRequest = []; 
		vm.businesses = null; 
		//Init load
		userService.show($routeParams.id).then(function(res){
			vm.user = res.data; 
		}); 
		businessService.index().then(function (res) {
			vm.businesses = res.data;
		}); 
		requestService.index().then(function (res) {
			var request = res.data; 
			request.forEach(r => {
				if (r.completed === false) {
					vm.activeRequest.push(r); 
				}
			});
		})
		//
		vm.getVehicles = function(){
			$location.path("/user/" + $routeParams.id + "/vehicle"); 
		}
        vm.getSettings = function(){
        		console.log('hello'); 
    			$location.path("/user/" + $routeParams.id + '/settings'); 
        }
		vm.getRequests = function(){
			$location.path("/user/" + $routeParams.id + "/request"); 
		}	
		vm.getBusiness = function(business) {
			$location.path("/user/" + $routeParams.id + "/business/" + business.id)
		}
	}
})	
