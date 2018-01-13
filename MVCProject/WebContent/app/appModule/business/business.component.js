angular.module('appModule')
.component('businessComponent', {
	templateUrl : "app/appModule/business/business.component.html",
	controllerAs : 'vm',
	controller : function(businessService){
		var vm = this;
		
		vm.quotes = [];
		
		vm.business = null;
		
		vm.message = "Working...";
		
		var getBusiness = function(id){
			businessService.show(id)
			.then(function(response){
				vm.business = response.data;
			})
		}
		getBusiness(1);
		
//		var getQuotes = function(id){
//			businessService.indexQuotes(id)
//			.then(function(response){
//				vm.quotes = response.data;
//			})
//		}
		
	}
})	
