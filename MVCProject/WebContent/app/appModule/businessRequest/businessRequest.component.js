angular.module('appModule')
.component('businessRequest', {
	templateUrl : 'app/appModule/businessRequest/businessRequest.component.html',
	controllerAs : 'vm',
	controller : function(businessRequestService){
		var vm = this;
		vm.requests = [];
		vm.selected = null;
		
		
		businessRequestService
		.indexRequests()
		.then(function(res){
			vm.requests = res.data;
		});
		
		vm.viewDetails = function(request){
			businessRequestService
			.show(request)
			.then(function(res){
				vm.selected = res.data;
			})
		}
		
	}
})