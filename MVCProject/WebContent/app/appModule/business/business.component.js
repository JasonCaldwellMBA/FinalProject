angular.module('appModule')
.component('businessComponent', {
	templateUrl : "app/appModule/business/business.component.html",
	controllerAs : 'vm',
	controller : function(businessService){
		var vm = this;
		
		vm.quotes = [];
		
		vm.business = null;
		
		vm.message = "Working...";
		
		vm.getBusiness = function(id){
			businessService.show(id)
			.then(function(response){
				vm.business = response.data;
			})
		}
		
	}
})	
