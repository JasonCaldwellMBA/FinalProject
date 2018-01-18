angular.module('appModule')
	.component('acceptedQuotes',{
		templateUrl : 'app/appModule/quote/acceptedQuotes/acceptedQuotes.component.html',
		controllerAs : 'vm',
		controller : function(quoteService, $routeParams, authService, $location){
			var vm = this;
			vm.bizId = $routeParams.bid;
			vm.acceptedQuotes = [];
			vm.sortCriteria = 'lastName';
			
			//init load
			quoteService.index()
			.then(function(res){
				var preQuotes = res.data;
				vm.acceptedQuotes = [];
				preQuotes.forEach(quote => {
					if(quote.acceptedRequest != undefined && quote.completed == false){
						vm.acceptedQuotes.push(quote);
					}
				})
				preQuotes = [];
			})	
	    		vm.viewDetails = function(quote){
	    			$location.path("business/"+ vm.bizId + "/quote/" + quote.id);
	    		};
	    		
	    		vm.markComplete = function(quote){
	    			quote.completed = true;
	    			quoteService.updateQuote(quote)
	    			.then(function(res){
	    				$location.path("business/"+vm.bizId+"/completedQuote")
	    			})
	    		}
			
		}
	})