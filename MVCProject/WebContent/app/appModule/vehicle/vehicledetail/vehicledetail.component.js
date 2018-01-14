angular.module('appModule')
	.component('vehicleDetail',{
		templateUrl:'app/appModule/vehicle/vehicledetail/vehicleDetail.component.html',
		controllerAs: 'vm',
		controller: function(vehicleService, $location, $routeParams){
			var vm = this; 
			vm.vehicle = null; 
//			init load
			vehicleService.show($routeParams.vid).then(function(res){
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