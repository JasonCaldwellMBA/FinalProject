angular.module('appModule')
.component('userComponent', {
	templateUrl : 'app/appModule/user/user.component.html',
	controllerAs : 'vm',
	controller : {
		var vm = this;

		vm.users = [];
		}
	}
		
		
