angular.module('appModule')
.component('userComponent', {
	templateUrl : 'app/appModule/user/user.component.html',
	controllerAs : 'vm',
	controller : function($routeParams, $location, userService, businessService){
		var vm = this;
		vm.user = null;
		//Init load
		userService.show($routeParams.id).then(function(res){
			vm.user = res.data; 
		}); 
		vm.getVehicles = function(){
			$location.path("/user/" + $routeParams.id + "/vehicle"); 
		}
		vm.getRequests = function(){
			$location.path("/user/" + $routeParams.id + "/request"); 
		}
		var loadBusinesses = function() {
			businessService.index()
			.then(function(res) {
			console.log("Data is: ", res.data);
			vm.businesses = res.data;
			})
			.catch(console.error);
			}
		loadBusinesses();
		
		vm.getBusiness = function() {
			$location.path("/user/business")
		}
	}
})	
