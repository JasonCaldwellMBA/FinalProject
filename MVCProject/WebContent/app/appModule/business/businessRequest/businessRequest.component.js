angular.module('appModule')
.component('businessRequest', {
	templateUrl : 'app/appModule/business/businessRequest/businessRequest.component.html',
	controllerAs : 'vm',
	controller : function(requestService, quoteService){
		var vm = this;
		vm.requests = [];
		vm.selected = null;
		vm.quoteFlag = null;
		
		var reload = function(){
			requestService
			.indexAllRequests()
			.then(function(res){
				vm.requests = res.data;
			});
		}
		reload();
		vm.viewDetails = function(request){
			requestService
			.showForBiz(request)
			.then(function(res){
				vm.selected = res.data;
			})
		}

		vm.addQuote = function(quote){
			quoteService
			.createQuote(quote, vm.selected.id)
			.then(function(res){
				vm.selected = null;
				vm.quoteFlag = null;
			})
		}
		
	}
})