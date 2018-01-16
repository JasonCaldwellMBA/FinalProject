angular.module('appModule')
	.component('request', {
		templateUrl : 'app/appModule/request/request.component.html',
		controllerAs : 'vm',
		controller : function(requestService, vehicleService, $cookies, $location, $routeParams) {				
			var vm = this;
			vm.requests = [];
			vm.vehicles = [];
			vm.vehicle = null; 

			//init load
			requestService.index().then(function (res) {
				vm.requests = res.data; 
			}); 
			vehicleService.index().then(function (res) {
				vm.vehicles = res.data; 
			})
			vm.addRequest = function (request) {
				request.vehicle = vm.vehicle; 
				request.active = true; 
				requestService.create(request).then(function (res) {
					reload(); 
				}); 
			}
			vm.destroy = function (request) {
				requestService.destroy(request).then(function (res) {
					reload();
				}); 
			}
			vm.detailView = function(id) {
				$location.path('user/' + $cookies.get('userId') + '/request/' + id);
			}
			vm.return = function(){
				$location.path('/user/' + $cookies.get('userId')); 
			}
			//helper methods; 
			reload = function () {
				requestService.index().then(function (res) {

					vm.requests = res.data; 
				}); 
				vehicleService.index().then(function (res) {
					vm.vehicles = res.data;
				}); 
			}
		}
}); 