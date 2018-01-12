angular.module('authModule')
	.component('register', {
		template: 'app/authModule/register/register.component.html',
		controllerAs: 'vm',
		controller: function(authService, $location){
			var vm = this; 
		}
}); 