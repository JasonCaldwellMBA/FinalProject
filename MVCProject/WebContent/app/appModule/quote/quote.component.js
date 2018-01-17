angular.module('appModule')
    .component('quote', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/quote/quote.component.html',
        controller: function (authService, quoteService, $location, $routeParams) {
            var vm = this; 
            vm.bizId = authService.getBusToken(); 
            vm.allQuotes = [];
            vm.acceptedQuotes = [];
            vm.pendingQuotes = [];
            vm.completedQuotes = [];
            vm.pendingFlag = false;
            vm.acceptedFlag = false;
            vm.completedFlag = false;
            vm.allQuotesFlag = true;
            
            quoteService.index().then(function(res){
            		vm.allQuotes = res.data;
            		getQuotes();
            })
            vm.addQuote = function(quote){
            		quote.active = true;
            		quoteService.create(quote).then(function(res){
            			reload();
            		});
            }
            
            vm.destroy = function (quote) {
            		quoteService.destroy(quote).then(function(res){
            			reload();
            		});
            }
            
            reload = function() {
            		quoteService.index().then(function(res){
            			vm.allQuotes = res.data;
            			getQuotes();
            		});
            }
            
	    		var getQuotes = function(){
	    			quoteService.index()
	    			.then(function(res){
	                    var preQuotes = res.data;
	                    vm.acceptedQuotes = [];
	                    vm.pendingQuotes = [];
	                    vm.completedQuotes = [];
	                    preQuotes.forEach(quote => {
	                        if (quote.acceptedRequest != undefined && quote.completed == false) {
	                            vm.acceptedQuotes.push(quote); 
	                        }
		    					if (quote.acceptedRequest == undefined && quote.completed == false) {
		    						vm.pendingQuotes.push(quote); 
		    					}
		    					if(quote.completed == true){
		    						vm.completedQuotes.push(quote)
		//    						return;
		    					}
	                    })
	                    preQuotes = [];
	    			})
	    		}
	    		
	    		vm.viewDetails = function(quote){
	    			$location.path("business/"+ vm.bizId + "/quote/" + quote.id);
	    		};
            
            vm.getPendingQuotes = function(){
            		vm.pendingFlag = true;
            		vm.allQuotesFlag = false;
            		vm.acceptedFlag = false;
            		vm.completedFlag = false;
            };
            
            vm.getAllQuotes = function(){
	            	vm.pendingFlag = false;
	            	vm.allQuotesFlag = true;
	            	vm.acceptedFlag = false;
	            	vm.completedFlag = false;
            };
            vm.getAcceptedQuotes = function(){
            		vm.acceptedFlag = true;
	            	vm.pendingFlag = false;
	            	vm.allQuotesFlag = false;
	            	vm.completedFlag = false;
            };
            vm.getCompletedQuotes = function(){
	            	vm.acceptedFlag = false;
	            	vm.pendingFlag = false;
	            	vm.allQuotesFlag = false;
	            	vm.completedFlag = true;
            }
            
            
        }
    })