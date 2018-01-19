angular.module('appModule')
	.component('businessRequest', {
		templateUrl: 'app/appModule/business/businessRequest/businessRequest.component.html',
		controllerAs: 'vm',
		controller: function (requestService, $routeParams, $location, businessService, quoteService, distanceMatrixService, authService, notificationService) {
			var vm = this;
			vm.requests = [];
			vm.notifications = null; 
			vm.size = null; 
			vm.selected = null;
			vm.quoteFlag = null;
			vm.business = null;
			vm.bizId = authService.getBusToken();
			vm.sortCriteria = 'expireDate';

			//init methods
			businessService.show($routeParams.id).then(function (res) {
				vm.business = angular.copy(res.data);

				notificationService.bizIndex(vm.bizId).then(function (res) {
					vm.notifications = res.data;
					vm.size = res.data.length;
				});
				requestService.indexAllRequests().then(function (res) {
					//UNCOMMENT FOR PRACTICAL PRESENTATION
					// var MAX_DISTANCE = 50;
					// var CONVERT_TO_MILES = 1.609344;
					// var r = res.data;
					// var origin = vm.business.contact.latitude + ',' + vm.business.contact.longitude;

					// r.forEach((req) => {
					// 	var destination = req.user.contact.latitude + ',' + req.user.contact.longitude;
					// 	//GET google API distance info
					// 	distanceMatrixService.getDistanceJson(origin, destination).then(function (res) {
					// 		var returnDistance = res.data;
					// 		if (returnDistance != undefined) {
					// 			var row = returnDistance.rows.pop();
					// 			var obj = row.elements.pop();
					// 			var miles = ((obj.distance.value / 1000) / CONVERT_TO_MILES);
					// 			if (miles <= MAX_DISTANCE) {
					// 				vm.requests.push(r);
					// 			}
					// 		}
					// 	}); 
					// })
					vm.requests = res.data;
				});
			});

			//helper methods
			var reload = function () {
				requestService.indexAllRequests().then(function (res) {
					vm.requests = res.data;
				});
			}
			vm.viewDetails = function (request) {
				requestService.showForBiz(request).then(function (res) {
					vm.selected = res.data;
				});
			}
			vm.return = function () {
				vm.quoteFlag = null;
			}
			vm.addQuote = function (quote) {
				quoteService.createQuote(quote, vm.selected.id).then(function (res) {
					//Create notification to the user of the request
					var notification = {
						business: vm.business,
						user: vm.selected.user,
						message: vm.business.companyName + ' sent a quote for #Request id: ' + vm.selected.id + ', Vehicle: ' + vm.selected.vehicle.make + ' ' + vm.selected.vehicle.model,
						type: "user"
					};
					notificationService.create(notification).then(function (res) {
					})

					vm.quoteFlag = null;
					vm.viewAllQuotes();
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