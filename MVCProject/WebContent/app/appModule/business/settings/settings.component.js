angular.module('appModule')
	.component('businessSettings', {
		templateUrl: 'app/appModule/business/settings/settings.component.html',
		controllerAs: 'vm',
		controller: function (businessService, $routeParams, $cookies, $location, authService, distanceMatrixService, notificationService) {
			var vm = this;
			vm.notifications = null; 
			vm.size = null; 
			vm.updatedBusiness = null;
			vm.business = null;
			vm.bizId = authService.getBusToken();

			//init methods
			if (authService.isBus() == false) {
                $location.path('/loginBusiness'); 
            }
			businessService.show($cookies.get('busId')).then(function (res) {
				vm.business = angular.copy(res.data);
				notificationService.bizIndex(vm.business.id).then(function (res) {
					vm.notifications = res.data;
					vm.size = vm.notifications.length;
				});
			});

			//CRUD  && functionality
			vm.return = function () {
				$location.path('business/' + $routeParams.bid);
			}
			vm.update = function (business) {
				console.log(business); 
                let b = business.contact; 
                let address = b.address1.split(' ').join('+') + '+' + b.city + '+' + b.state +'+' +  b.zipcode; 
                distanceMatrixService.geocode(address).then(function(res){
                		let obj = res.data.results.pop().geometry.location
                		
                		business.contact.latitude = obj.lat;
                		business.contact.longitude = obj.lng;
                		businessService.update(business).then(function (res) {
                			if (res.status >= 200 && res.status < 300) {
                				vm.updatedBusiness = res.data;
                			}
                			console.log(res.data);
                			vm.business = res.data;
                			reload();
                		}); 
                }); 
			}
			vm.destroyAccount = function () {
				businessService.destroy().then(function (res) {
					authService.logout();
					$location.path('/home');
				})
			}
			//Helper methods
			var reload = function () {
				businessService.show($cookies.get('busId')).then(function (res) {
					vm.business = angular.copy(res.data);
				});
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