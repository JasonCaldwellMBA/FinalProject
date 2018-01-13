angular.module('appModule')
.component('userComponent', {
	templateUrl : 'app/appModule/user/user.component.html',
	controllerAs : 'vm',
	controller : function($routeParams, $location, userService){
		var vm = this;
		vm.requests = [];
		vm.user = null;
		//Init load
		userService.show($routeParams.id).then(function(res){
			vm.user = res.data; 
		}); 
		
		var getRequests = function(id){
			userService.indexRequests(id)
			.then(function(response){
				vm.requests = response.data;
			})
		}
		
		vm.detailedRequest = function(request){
			vm.copy = angular.copy(request);	
		}
		vm.getVehicles = function(){
			$location.path("user/" + $routeParams.id + "/vehicle"); 
		}
	}
})	
