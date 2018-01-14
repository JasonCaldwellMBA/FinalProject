angular.module('appModule')
.component('businessComponent', {
	templateUrl : "app/appModule/business/business.component.html",
	controllerAs : 'vm',
	controller : function(businessService, $routeParams, $location){
		var vm = this;
		vm.copy = null;
		
		vm.quotes = [];
		
		vm.business = null;
		
		vm.singleQuote = null;
		
		vm.message = "Working...";
		
		var getBusiness = function(id){
			businessService.show(id)
			.then(function(response){
				vm.business = response.data;
			})
		}		

		
		getBusiness($routeParams.busId);
		var getQuotes = function(id){
			businessService.indexQuotes(id)
			.then(function(response){
				vm.quotes = response.data;
			})
		}
		getQuotes($routeParams.busId);
		
		vm.detailedQuote = function(quote){
			vm.copy = angular.copy(quote);	
		}
		
		var getQuote = function(bid, qid){
			businessService.getQuote(bid, qid)
			.then(function(res){
				vm.singleQuote = res.data;
			})
		}
		
		vm.getRequests = function(){
			$location.path("/request");
		}
		
	
		
	}
})	
