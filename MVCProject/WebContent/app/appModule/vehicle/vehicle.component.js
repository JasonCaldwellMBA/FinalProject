angular.module('appModule')
.component(
		'vehicle',
		{
			templateUrl : 'app/appModule/vehicle/vehicle.component.html',
			controllerAs : 'vm',
			controller : function(vehicleService, $cookies, $location,
				$routeParams, authService, userService, notificationService) {
				var vm = this;
				vm.userId = authService.getToken(); 
				vm.vehicles = []
				vm.notifications = null; 
				vm.size = null; 
				vm.user = null; 

				vehicleService.index().then(function(res) {
					vm.vehicles = res.data;
					notificationService.index($routeParams.id).then(function (res) {
						vm.notifications = res.data;
						vm.size = vm.notifications.length;
						// if (res.data = null) {
						// 	vm.size = 0; 
						// }
					}); 
				});
				userService.show(vm.userId).then(function(res){
					vm.user = res.data; 
				})
				vm.detailView = function(id) {
					$location.path('user/' + $cookies.get('userId')
							+ '/vehicle/' + id);
				}
				vm.addVehicle = function (vehicle) {
					vehicle.active = true; 
					vehicleService.create(vehicle).then(function(res){
						reload(); 
					}); 
				}
				vm.destroy = function(id) {
					vehicleService.destroy(id).then(function (res) {
						reload();
					})
				}
				// helpermethods
				var reload = function() {
					vehicleService.index().then(function(res) {
						vm.vehicles = res.data;
					});
				}
				vm.return = function(){
					$location.path('/user/' + $routeParams.id); 
				}
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
		});