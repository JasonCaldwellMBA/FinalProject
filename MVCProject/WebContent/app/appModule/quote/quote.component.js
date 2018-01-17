angular.module('appModule')
    .component('quote', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/quote/quote.component.html',
        controller: function (authService, quoteService, $location, $routeParams) {
            var vm = this; 
            vm.bizId = authService.getBusToken(); 
            vm.allQuotes = [];
            vm.business = null;
            
            
            
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
    
        }
    })