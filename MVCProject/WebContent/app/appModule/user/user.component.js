angular.module('appModule')
.component('userComponent', {
	templateUrl : 'app/appModule/user/user.component.html',
	controllerAs : 'vm',
	controller : function(userComponent, $routeParams){
		var vm = this;

		vm.requests = [];
		
		vm.user = null;
		
//=========================Get User=====================//
		
		var getUser = function(id){
			userService.show(id)
			.then(function(response){
				vm.user = response.data;
			})
		}		

		}
		getUser(1);
		
//==========================Get Requests=================//
		
		var getRequests = function(id){
			userService.indexRequests(id)
			.then(function(response){
				vm.requests = response.data;
			})
		}
		getRequests(1);
		
//======================Make Copy of Requests==============//
		
		vm.detailedRequest = function(request){
			vm.copy = angular.copy(request);	
		}
		
//==========================Get Vehicle=====================//
		
		vm.getVehicles = function(){
			$location.path("user/" + $routeParams.id + "/vehicle"); 
			}
		}

	
})	
