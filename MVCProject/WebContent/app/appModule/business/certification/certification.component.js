angular.module('appModule')
	.component('certification', {
		templateUrl: 'app/appModule/business/certification/certification.component.html',
		controllerAs: 'vm',
		controller: function (certificationService, $cookies, $location,
			$routeParams, authService, businessService, notificationService) {
			var vm = this;
			vm.notifications = null; 
			vm.size = null; 
			vm.business = null; 
			vm.certifications = [];
			vm.bizId = authService.getBusToken();

			if (authService.isBus() == false) {
                $location.path('/loginBusiness'); 
			}
			
			vm.detailView = function (certid) {
				$location.path('business/' + authService.getBusToken() + '/certification/' + certid);
			}

			certificationService.index().then(function (res) {
				vm.certifications = res.data;
				
				businessService.show(vm.bizId).then(function (res) {
					vm.business = res.data;

					notificationService.bizIndex(vm.bizId).then(function (res) {
						vm.notifications = res.data;
						vm.size = res.data.length;
					});
				});
			});

			vm.addCertification = function (certification) {
				certificationService.addCertification(certification).then(function (res) {
					reload();
				});
			}

			var reload = function () {
				certificationService.index().then(function (res) {
					vm.certifications = res.data;
				});
			}

			vm.return = function () {
				$location.path('/business/' + $routeParams.id);
			}

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