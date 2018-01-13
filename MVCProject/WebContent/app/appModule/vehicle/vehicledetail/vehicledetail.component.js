angular.module('appModule')
	.component('vehicleDetail',{
		templateUrl:'app/appModule/vehicle/vehicledetail/vehicledetail.component.html',
		controllerAs: 'vm',
		controller: function(vehicleService, $location, $routeParams){
			var vm = this; 
			vm.vehicle = null; 
			
			vehicleService.show($routeParams.vid).then(function(res){
				if (parseInt($routeParams.vid)) {
					console.log(res.data)
					vm.vehicle = res.data; 
				}
			}); 
			
			vm.update = function(){
				
			}
			vm.destroy = function(){
				
			}
		}
	})