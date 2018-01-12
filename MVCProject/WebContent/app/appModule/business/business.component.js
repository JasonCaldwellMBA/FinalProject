angular.module('appModule')
.component('busComponent', {
	templateUrl : "app/appModule/business/business.component.html",
	controllerAs : 'vm',
	controller : function(busService){
		var vm = this;
		
		vm.quotes = [];
		
		vm.business = null;
		
		vm.getBusiness = function(id){
			busService.show(id)
			.then(function(response){
				vm.business = response.data;
			})
		}
		
	}
})	
