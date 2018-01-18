angular.module('appModule')
    .component('quote', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/quote/quote.component.html',
        controller: function (authService, quoteService, $location, $routeParams) {
            var vm = this; 
            vm.bizId = authService.getBusToken(); 
            vm.allQuotes = [];
            vm.business = null;
            vm.sortCriteria = 'lastName';
            
            
            quoteService.index().then(function(res){
            		vm.allQuotes = res.data;
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
            		});
            }
	    		
	    		vm.viewDetails = function(quote){
	    			$location.path("business/"+ vm.bizId + "/quote/" + quote.id);
	    		};
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