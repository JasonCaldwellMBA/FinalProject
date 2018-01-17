angular.module('appModule')
	.component('completedQuotes',{
		templateUrl : 'app/appModule/quote/completedQuotes/completedQuotes.component.html',
		controllerAs : 'vm',
		controller : function(quoteService, $routeParams, authService, $location){
			var vm = this;
			vm.bizId = $routeParams.bid;
			vm.completedQuotes = [];
			
			//init load
			quoteService.index()
			.then(function(res){
				var preQuotes = res.data;
				vm.completedQuotes = [];
				preQuotes.forEach(quote => {
					if(quote.completed == true){
						vm.completedQuotes.push(quote);
					}
				})
				preQuotes = [];
			})	
	    		vm.viewDetails = function(quote){
	    			$location.path("business/"+ vm.bizId + "/quote/" + quote.id);
	    		};
			
		}
	})