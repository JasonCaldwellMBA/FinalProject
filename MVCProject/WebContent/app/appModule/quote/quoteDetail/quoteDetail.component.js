angular.module('appModule')
	.component('quoteDetail', {
		templateUrl : 'app/appModule/quote/quoteDetail/quoteDetail.component.html',
		controllerAs : 'vm',
		controller : function(quoteService, authService, $location, $routeParams){
			var vm = this;
			vm.quote = null;
			vm.bizId = authService.getBusToken();
			vm.updateFlag = false;
			vm.detailFlag = true;
			
			quoteService
				.show($routeParams.bid, $routeParams.qid)
				.then(function(res){
					vm.quote = angular.copy(res.data);
				});
			vm.returnToQuotes = function(){
				$location.path("business/"+ $routeParams.bid + "/quote")
			}
			vm.update = function(quote){
				quoteService.updateQuote(quote).then(function(res){
					vm.detailFlag = true;
				})
	
			}
			
		}
	})