angular.module('appModule').component(
		'vehicle',
		{
			templateUrl : 'app/appModule/vehicle/vehicle.component.html',
			controllerAs : 'vm',
			controller : function(vehicleService, $cookies, $location,
					$routeParams) {
				var vm = this;
				vm.vehicles = [];

				vehicleService.index().then(function(res) {
					vm.vehicles = res.data;
				});
				vm.detailView = function(id) {
					$location.path('user/' + $cookies.get('userId')
							+ '/vehicle/' + id);
				}
				vm.destroy = function(id) {
					vehicleService.destroy(id).then(function(res) {
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
			}
		});