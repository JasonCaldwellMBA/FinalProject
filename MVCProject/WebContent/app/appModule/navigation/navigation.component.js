angular.module('appModule')
	.component('navigation', {
		templateUrl : "app/appModule/navigation/navigation.component.html",
		controller: function (authService, $location) {
			var vm = this; 
			vm.status = null;
			vm.userId = null; 
			vm.bizId = null; 
			$location.path('/home')
			setInterval(function () {
				if (authService.isUser() || authService.isBus()) {
					if (authService.getToken()) {
						vm.userId = authService.getToken(); 
						vm.bizId = null; 
					}
					if (authService.getBusToken()) {
						vm.bizId = authService.getBusToken(); 
						vm.userId = null; 
					}
					vm.status = {}; 
				}
				else {
					vm.userId = null; 
					vm.bizId = null; 
					vm.status = null; 
				}
			}, 10); 
		},
		controllerAs: "vm"
	});