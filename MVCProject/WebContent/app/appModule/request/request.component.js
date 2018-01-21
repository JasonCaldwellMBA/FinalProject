angular.module('appModule')
	.component('request', {
		templateUrl : 'app/appModule/request/request.component.html',
		controllerAs : 'vm',
		controller : function(userService, authService, notificationService, requestService, vehicleService, $cookies, $location, $routeParams) {				
			var vm = this;
			vm.userId = authService.getToken(); 
			vm.requests = [];
			vm.vehicles = [];
			vm.user = null; 
			vm.vehicle = null; 
			vm.sortCriteria = 'estimate';

			//init load
			if (authService.isUser() == false) {
				var id = authService.getToken(); 
                $location.path('/login'); 
			}
			
			requestService.index().then(function (res) {
				let preRequest  = res.data; 
				preRequest.forEach(r =>{
					if(r.active == true){
						vm.requests.push(r); 
					}
				})
				userService.show(authService.getToken()).then(function(res){
					vm.user = res.data; 
				})
				
				notificationService.index($routeParams.id).then(function (res) {
					vm.notifications = res.data; 
					vm.size = vm.notifications.length; 
				})
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
					vm.getRequests(); 
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
			//Routing methods
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