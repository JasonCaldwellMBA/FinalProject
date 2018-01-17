angular.module('appModule')
	.component('pendingQuotes',{
		templateUrl : 'app/appModule/quote/pendingQuotes/pendingQuotes.component.html',
		controllerAs : 'vm',
		controller : function(quoteService, $routeParams, authService, $location){
			var vm = this;
			vm.bizId = $routeParams.bid;
			vm.pendingQuotes = [];
			vm.updateFlag = false;
			vm.quote = null;
			
			//init load
			var reload = function(){
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
			reload();
	    		vm.viewDetails = function(quote){
	    			$location.path("business/"+ vm.bizId + "/quote/" + quote.id);
	    		};
	    		
	    		vm.update = function(quote){
	    			vm.updateFlag = true;
	    			vm.quote = angular.copy(quote);
	    		}
	    		vm.updateQuote = function(quote){
	    			quoteService.updateQuote(quote).then(function(res){
	    				vm.updateFlag = false;
	    				vm.quote = null;
	    				reload();
	    			})
	    		}
			
		}
	})