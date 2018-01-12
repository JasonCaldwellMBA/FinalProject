angular.module('appModule')
	.component('register', {
		template: 'app/authModule/register/register.component.html',
		controllerAs: 'vm',
		controller: function($location){
			var vm = this; 
		}
}); 