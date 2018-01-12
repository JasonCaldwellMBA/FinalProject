angular.module('appModule')
	.component('register', {
		template: 'app/appModule/register/register.component.html',
		controllerAs: 'vm',
		controller: function($location){
			var vm = this; 
		}
	}); 