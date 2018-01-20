angular.module('appModule')
	.component('businessComponent', {
		templateUrl: "app/appModule/business/business.component.html",
		controllerAs: 'vm',
		controller: function (authService, businessService, quoteService, certificationService, $routeParams, $location, notificationService) {
			var vm = this;
			vm.bizId = authService.getBusToken();
			vm.activeQuotes = [];
			vm.business = null;
			vm.businesses = [];
			vm.notifications = null;
			vm.size = null;

			//init load
			if (authService.isBus() == false) {
                $location.path('/loginBusiness'); 
            }
			quoteService.index().then(function (res) {
				var preQuotes = res.data;
				vm.acceptedQuotes = [];
				preQuotes.forEach(quote => {
					if (quote.acceptedRequest != undefined && quote.completed == false) {
						vm.activeQuotes.push(quote);
					}
				})
				preQuotes = [];
			})
			businessService.index().then(function (res) {
				vm.businesses = res.data;
			})
			businessService.show($routeParams.busId).then(function (res) {
				vm.business = res.data;
				notificationService.bizIndex(vm.business.id).then(function (res) {
					vm.notifications = res.data;
					vm.size = vm.notifications.length;
				});
			})
			//Helper methods
			vm.getRequests = function () {
				$location.path("/request");
			}

			vm.viewDetails = function (quote) {
				$location.path("business/" + vm.business.id + "/quote/" + quote.id);
			};

			//functions for sidebar routing
			vm.home = function () {
				$location.path("business/" + vm.bizId);
			}
			vm.viewAllQuotes = function () {
				$location.path("business/" + vm.bizId + "/quote");
			}
			vm.viewPendingQuotes = function () {
				$location.path("business/" + vm.bizId + "/pendingQuotes");
			}
			vm.viewAcceptedQuotes = function () {
				$location.path("business/" + vm.bizId + "/acceptedQuotes");
			}
			vm.viewCompletedQuotes = function () {
				$location.path("business/" + vm.bizId + "/completedQuotes");
			}
			vm.viewRequests = function () {
				$location.path("business/" + vm.bizId + "/request");
			}
			vm.viewCertifications = function () {
				$location.path("business/" + vm.bizId + "/certification");
			}
			vm.viewSettings = function () {
				$location.path("business/" + vm.bizId + "/settings");
			}

		}
	})
