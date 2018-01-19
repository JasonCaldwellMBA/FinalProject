angular.module('appModule')
	.component('completedQuotes',{
		templateUrl : 'app/appModule/quote/completedQuotes/completedQuotes.component.html',
		controllerAs : 'vm',
		controller : function(quoteService, $routeParams, authService, $location, businessService, notificationService){
			var vm = this;
			vm.business = null; 
			vm.notifications = null; 
			vm.size = null; 
			vm.bizId = $routeParams.bid;
			vm.completedQuotes = [];
			vm.sortCriteria = 'expiredDate';
			
			//init load
			quoteService.index().then(function(res){
				var preQuotes = res.data;
				vm.completedQuotes = [];
				preQuotes.forEach(quote => {
					if(quote.completed == true){
						vm.completedQuotes.push(quote);
					}
				})

				businessService.show(vm.bizId).then(function (res) {
					vm.business = res.data;

					notificationService.bizIndex(vm.bizId).then(function (res) {
						vm.notifications = res.data;
						vm.size = res.data.length;
					});
				}); 
				preQuotes = [];
			})	
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