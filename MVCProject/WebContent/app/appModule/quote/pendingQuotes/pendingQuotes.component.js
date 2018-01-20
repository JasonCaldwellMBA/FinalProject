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
			vm.sortCriteria = 'expireDate';
			
			//init load
			if (authService.isBus() == false) {
                $location.path('/loginBusiness'); 
            }
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
	    		vm.deleteQuote = function(id){
	    			quoteService.deleteQuote(id).then(function(res){
	    				reload();
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