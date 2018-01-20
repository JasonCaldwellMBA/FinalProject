angular.module('appModule')
	.component('userComponent', {
		templateUrl: 'app/appModule/user/user.component.html',
		controllerAs: 'vm',
		controller: function ($routeParams, $location, userService, businessService, requestService, distanceMatrixService, notificationService, authService) {
			var vm = this;
			vm.user = null;
			vm.notifications = null; 
			vm.size = null; 
			vm.activeRequest = [];
			vm.businesses = [];

			if (authService.isUser() == false) {
				var id = authService.getToken(); 
                $location.path('/login'); 
			}
			//Init load
			userService.show($routeParams.id).then(function (res) {
				vm.user = res.data;
				//once user has loaded load businesses 
				//Commenting out to not overload API calls
				businessService.index().then(function (res) {
					var MAX_DISTANCE = 50;
					var CONVERT_TO_MILES = 1.609344;
					var b = res.data;
					var origin = vm.user.contact.latitude + ',' + vm.user.contact.longitude; 

					b.forEach((biz) => {
						var destination = biz.contact.latitude + ',' + biz.contact.longitude; 
						//GET google API distance info
						distanceMatrixService.getDistanceJson(origin, destination).then(function (res) {
							var returnDistance  = res.data;
							if (returnDistance != undefined){
								var row = returnDistance.rows.pop(); 
								var obj = row.elements.pop(); 
								var miles = ((obj.distance.value / 1000) / CONVERT_TO_MILES);
								if (miles <= MAX_DISTANCE) {
									vm.businesses.push(biz);
								}
							}
						})
					})

					//remove for presentation
					// vm.businesses = res.data
				});
				notificationService.index($routeParams.id).then(function (res) {
					vm.notifications = res.data; 
					vm.size = vm.notifications.length; 
				})
			});

			requestService.index().then(function (res) {
				var request = res.data;
				request.forEach(r => {
					if (r.completed === false) {
						vm.activeRequest.push(r);
					}
				});
			})
			//
			vm.getHome = function () {
				$location.path("/user/" + $routeParams.id); 
			}
			vm.getVehicles = function () {
				$location.path("/user/" + $routeParams.id + "/vehicle");
			}
			vm.getSettings = function () {
				$location.path("/user/" + $routeParams.id + '/settings');
			}
			vm.getRequests = function () {
				$location.path("/user/" + $routeParams.id + "/request");
			}
			vm.getBusiness = function (business) {
				$location.path("/user/" + $routeParams.id + "/business/" + business.id)
			}
			vm.getNotifications = function () {
				$location.path('/user/' + $routeParams.id + '/notification');
			}
		}
	})	
