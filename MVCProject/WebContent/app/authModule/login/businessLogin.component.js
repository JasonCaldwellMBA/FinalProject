angular.module('authModule')
.component('businessLogin',{
	templateUrl : 'app/authModule/login/businessLogin.component.html',
	controllerAs : 'vm',
	controller : function (authService, $location, $cookies) {
		var vm = this;
		if (authService.isUser() == true){
			var id = authService.getBusToken();
			$location.path('/business/' + id);
		}
		vm.setBusiness = function (business) {
			authService.businessLogin(business)
			.then(function (res){
				console.log(res);
				console.log(res.data.id);
				if(authService.setBusToken(res.data.id)){
					$location.path('/business/' + authService.getBusToken());
				}
				return;
			})
		}
	}
});