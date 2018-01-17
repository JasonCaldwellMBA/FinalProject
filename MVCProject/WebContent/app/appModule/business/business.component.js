angular.module('appModule')
.component('businessComponent', {
	templateUrl : "app/appModule/business/business.component.html",
	controllerAs : 'vm',
	controller : function(authService, businessService, quoteService, certificationService, $routeParams, $location){
		var vm = this;
		vm.bizId = authService.getBusToken(); 
		vm.copy = null;
		
		vm.pendingQuotes = [];
		vm.winningQuotes = [];
		vm.completedQuotes = [];
		vm.update = null;
		
		vm.business = null;
		
		vm.singleQuote = null;
		
		vm.message = "Working...";
		
		vm.businesses = [];
		
		vm.loadBusinesses = function(){
		
			businessService.index().then(function(res) {
			vm.businesses = res.data;
			console.log("Data is: ", res.data);
		
		});
		}
		vm.loadBusinesses();
		
		var getBusiness = function(id){
			businessService.show(id)
			.then(function(response){
				vm.business = response.data;
			})
		}		

		
		getBusiness($routeParams.busId);
		
		var getQuotes = function(){
			var id = authService.getBusToken();
			businessService.indexQuotes(id)
			.then(function(res){
                var preQuotes = res.data;
                vm.winningQuotes = [];
                vm.pendingQuotes = [];
                vm.completedQuotes = [];
                preQuotes.forEach(quote => {
                    if (quote.acceptedRequest != undefined && quote.completed == false) {
                        vm.winningQuotes.push(quote); 
                    }
					if (quote.acceptedRequest == undefined && quote.completed == false) {
						vm.pendingQuotes.push(quote); 
					}
					if(quote.completed == true){
						vm.completedQuotes.push(quote)
//						return;
					}
                })
                preQuotes = [];
			})
		}
//		var getPendingQuotes = function(){
//			var id = authService.getBusToken();
//			businessService.indexQuotes(id)
//			.then(function(res){
//				var preQuotes = res.data;
//				preQuotes.forEach(quote => {
//					if (quote.acceptedRequest == undefined) {
//						vm.pendingQuotes = []; 
//						vm.pendingQuotes.push(quote); 
//						return; 
//					}
//				})
//			})
//		}
	
		
		getQuotes();
//		getPendingQuotes();
		
		vm.detailedQuote = function(quote){
			vm.copy = angular.copy(quote);	
		}
		
		var getQuote = function(bid, qid){
			businessService.getQuote(bid, qid)
			.then(function(res){
				vm.singleQuote = res.data;
			})
		}
		
		vm.getRequests = function(){
			$location.path("/request");
		}
		
		vm.updateQuote = function(quote){
			quoteService.updateQuote(quote, vm.copy.id)
			.then(function(res){
				vm.selected = null;
				vm.copy = null;
				vm.update = null;
				getQuotes();
			})
		}
		
		vm.markComplete = function(quote){
			quote.completed = true;
			quoteService.updateQuote(quote)
			.then(function(res){
				vm.selected = null;
				vm.copy = null;
				vm.update = null;
				getQuotes();
			})
		}

	}
})	





