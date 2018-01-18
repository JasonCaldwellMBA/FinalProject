angular.module('appModule')
	.component('acceptedQuotes',{
		templateUrl : 'app/appModule/quote/acceptedQuotes/acceptedQuotes.component.html',
		controllerAs : 'vm',
		controller : function(quoteService, $routeParams, authService, $location){
			var vm = this;
			vm.bizId = authService.getBusToken();
			vm.acceptedQuotes = [];
			
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
	    		
	    		//functions for sidebar routing
	    		vm.home = function(){
	    			$location.path("business/" + vm.bizId);
	    		}
	    		vm.viewAllQuotes = function(){
	    			$location.path("business/" + vm.bizId + "/quote");
	    		}
	    		vm.viewPendingQuotes = function(){
	    			$location.path("business/" + vm.bizId + "/pendingQuotes");
	    		}
	    		vm.viewAcceptedQuotes = function(){
	    			$location.path("business/" + vm.bizId + "/acceptedQuotes");
	    		}
	    		vm.viewCompletedQuotes = function(){
	    			$location.path("business/" + vm.bizId + "/completedQuotes");
	    		}
	    		vm.viewRequests = function(){
	    			$location.path("business/" + vm.bizId + "/request");
	    		}
	    		vm.viewCertifications = function(){
	    			$location.path("business/" + vm.bizId + "/certification");
	    		}
	    		vm.viewSettings = function(){
	    			$location.path("business/" + vm.bizId + "/settings");
	    		}
			
		}
	})