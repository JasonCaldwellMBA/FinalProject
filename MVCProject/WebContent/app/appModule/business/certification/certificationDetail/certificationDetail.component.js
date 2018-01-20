angular.module('appModule')
	.component('certificationDetail', {
		templateUrl: 'app/appModule/business/certification/certificationDetail/certificationDetail.component.html',
		controllerAs: 'vm',
		controller: function (certificationService, $location, $routeParams, authService, notificationService, businessService) {
			var vm = this;
			vm.certification = null;
			vm.bizId = authService.getBusToken();
			vm.business = null;
			vm.notifications = null;
			vm.size = null;

			if (authService.isBus() == false) {
                $location.path('/loginBusiness'); 
            }
			certificationService.show($routeParams.certid).then(function (res) {
				vm.certification = angular.copy(res.data);

				businessService.show(vm.bizId).then(function (res) {
					vm.business = res.data;

					notificationService.bizIndex(vm.bizId).then(function (res) {
						vm.notifications = res.data;
						vm.size = res.data.length;
					});
				});
			});

			vm.updateCertification = function (certification) {
				certificationService.updateCertification(certification).then(function (res) {
					reload();
					vm.return();
				});
			}

			vm.destroy = function (certid) {
				certificationService.destroy(certid).then(function (res) {
					vm.return();
				});
			}

			vm.return = function () {
				$location.path('business/' + $routeParams.bid + '/certification');
			}

			var reload = function () {
				certificationService.show($routeParams.certid).then(function (res) {
					vm.certification = res.data;
				});
			}
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