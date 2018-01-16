angular.module('appModule')
.component('businessSettings', {
	templateUrl : 'app/appModule/business/settings/settings.component.html',
	controllerAs : 'vm',
	controller : function(businessService, $cookies, $location, authService){
		var vm = this;
		vm.updatedBusiness = null;
		vm.business = null;
		
		var reload = function(){
			businessService.show($cookies.get('busId'))
				.then(function(res){
					vm.business = angular.copy(res.data);
				});
		}
		reload();
		console.log(vm.business);
		
		vm.update = function(business){
			businessService.update(business).then(function(res){
				vm.business = res.data;
				reload();
			})
		}
		vm.destroyAccount = function(){
			businessService.destroy().then(function(res){
				authService.logout();
				$location.path('/home');
			})
		}
	}
})	