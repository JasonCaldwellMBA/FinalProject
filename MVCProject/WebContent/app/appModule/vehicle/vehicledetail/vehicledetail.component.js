angular.module('appModule')
	.component('vehicleDetail', {
		templateUrl: 'app/appModule/vehicle/vehicledetail/vehicledetail.component.html',
		controllerAs: 'vm',
		controller: function (vehicleService, $location, $routeParams) {
			var vm = this;
			vm.vehicle = null;
			//			init load
			if (authService.isUser() == false) {
				var id = authService.getToken();
				$location.path('/login');
			}
			vehicleService.show($routeParams.vid).then(function (res) {
				vm.vehicle = angular.copy(res.data);
			});

			vm.update = function (vehicle) {
				vehicleService.update(vehicle).then(function (res) {
					reload();
					vm.return();
				})
			}
			vm.destroy = function (vehicle) {
				vehicleService.destroy(vehicle.id).then(function (res) {
					vm.return();
				});
			}
			vm.return = function () {
				$location.path('user/' + $routeParams.uid + '/vehicle');
			}
			var reload = function () {
				vehicleService.show($routeParams.vid).then(function (res) {
					vm.vehicle = res.data;
				});
			}
		}
	})