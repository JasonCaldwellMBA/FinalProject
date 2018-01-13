angular.module('appModule')
.component('userComponent', {
	templateUrl : 'app/appModule/user/user.component.html',
	controllerAs : 'vm',
	controller : function(userComponent){
		var vm = this;

		vm.requests = [];
		
		vm.user = null;
		
		vm.getUser = function(id){
			userService.show(id)
			.then(function(response){
				vm.user = response.data;
			})
		}
		}
}); 
		
		
