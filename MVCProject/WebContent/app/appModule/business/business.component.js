angular.module('appModule')
.component('businessComponent', {
	templateUrl : "app/appModule/business/business.component.html",
	controllerAs : 'vm',
	controller : function(authService, businessService, quoteService, certificationService, $routeParams, $location){
		var vm = this;
		vm.bizId = authService.getBusToken();
		vm.activeQuotes = [];
		vm.business = null;
		vm.businesses = [];

		//init load
		quoteService.index()
		.then(function(res){
			var preQuotes = res.data;
			vm.acceptedQuotes = [];
			preQuotes.forEach(quote => {
				if(quote.acceptedRequest != undefined && quote.completed == false){
					vm.activeQuotes.push(quote);
				}
			})
			preQuotes = [];
		})	
		
		vm.loadBusinesses = function(){
			businessService.index()
			.then(function(res) {
				vm.businesses = res.data;
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


		vm.getRequests = function(){
			$location.path("/request");
		}
		
		vm.viewDetails = function(quote){
			$location.path("business/"+ vm.business.id + "/quote/" + quote.id);
		};

	}
})
