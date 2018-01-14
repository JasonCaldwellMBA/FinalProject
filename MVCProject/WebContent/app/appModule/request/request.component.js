angular.module('appModule')
	.component('request', {
		templateUrl : 'app/appModule/request/request.component.html',
		controllerAs : 'vm',
		controller : function(requestService, $cookies, $location, $routeParams) {				
			var vm = this;
			vm.requests = [];
			vm.detailView = function(id) {
				$location.path('user/' + $cookies.get('userId')
							+ '/request/' + id);
			}
			vm.return = function(){
				$location.path('/user/' + $cookies.get('userId')); 
			}
		}
}); 