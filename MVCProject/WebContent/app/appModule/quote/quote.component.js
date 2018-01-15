angular.module('appModule')
    .component('quote', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/quote/quote.component.html',
        controller: function (quoteService, $location, $routeParams) {
            var vm = this; 
            vm.quotes = [];
            
            quoteService.index().then(function(res){
            		vm.quotes = res.data;
            })
            
            quoteService.indexQuotesForBusiness().then(function(res){
            	vm.quotes = res.data;
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
            			vm.quotes = res.data;
            		});
            }
        }
    })