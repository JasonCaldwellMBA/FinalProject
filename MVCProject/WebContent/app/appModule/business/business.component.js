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
