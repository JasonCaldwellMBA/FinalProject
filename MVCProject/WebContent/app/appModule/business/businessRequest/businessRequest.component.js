angular.module('appModule')
	.component('businessRequest', {
		templateUrl: 'app/appModule/business/businessRequest/businessRequest.component.html',
		controllerAs: 'vm',
		controller: function (requestService, $routeParams, businessService, quoteService, distanceMatrixService, authService) {
			var vm = this;
			vm.business = null;
			vm.requests = [];
			vm.selected = null;
			vm.quoteFlag = null;
			vm.business = null;
		
            businessService.show($routeParams.bid).then(function (res) {
                vm.business = angular.copy(res.data);
            }); 
			
			//init Methods
			businessService.show($routeParams.id).then(function (res) {
				vm.business = res.data;
				console.log(vm.business);
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
					vm.quoteFlag = null;
				});
			}
		}
	})