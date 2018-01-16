angular.module('appModule')
.component('businessSettings', {
	templateUrl : 'app/appModule/business/settings/settings.component.html',
	controllerAs : 'vm',
	controller : function(businessService, $cookies){
		var vm = this;
		vm.updatedBusiness = null;
		vm.contact = null;
		vm.business = null;
		
		businessService.show($cookies
				.get('busId'))
				.then(function(res){
					vm.business = res.data;
					vm.contact = vm.business.contact;
				});
		
		console.log(vm.business);
		
		vm.updateBusiness = function(business, contact){
			businessService.update(business, contact).then(function(res){
				vm.updatedBusiness = res.data;
			})
		}
	}
})	