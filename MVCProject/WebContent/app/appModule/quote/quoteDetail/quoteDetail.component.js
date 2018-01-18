angular.module('appModule')
	.component('quoteDetail', {
		templateUrl : 'app/appModule/quote/quoteDetail/quoteDetail.component.html',
		controllerAs : 'vm',
		controller : function(quoteService, authService, $location, $routeParams){
			var vm = this;
			vm.quote = null;
			vm.bizId = authService.getBusToken();
			vm.updateFlag = false;
			vm.detailFlag = true;
			
			quoteService
				.show($routeParams.bid, $routeParams.qid)
				.then(function(res){
					vm.quote = angular.copy(res.data);
				});
			vm.returnToQuotes = function(){
				$location.path("business/"+ $routeParams.bid + "/quote")
			}
			vm.update = function(quote){
				quoteService.updateQuote(quote).then(function(res){
					vm.detailFlag = true;
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