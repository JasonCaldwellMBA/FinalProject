angular.module('authModule')
	.component('logout', {
		templateUrl:'app/authModule/logout/logout.component.html',
		controllerAs: 'vm',
		controller: function(authService){
			var vm = this; 
			console.log(authService.logout()); 
		}
	})