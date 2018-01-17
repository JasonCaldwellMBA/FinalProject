angular.module('appModule')
	.component('pendingQuotes',{
		templateUrl : 'app/appModule/quote/pendingQuotes/pendingQuotes.component.html',
		controllerAs : 'vm',
		controller : function(quoteService, $routeParams, authService, $location){
			var vm = this;
			vm.bizId = $routeParams.bid;
			vm.pendingQuotes = [];
			
			//init load
			quoteService.index()
			.then(function(res){
				var preQuotes = res.data;
				vm.pendingQuotes = [];
				preQuotes.forEach(quote => {
					if(quote.acceptedRequest == undefined && quote.completed == false){
						vm.pendingQuotes.push(quote);
					}
				})
				preQuotes = [];
			})	
			
		}
	})