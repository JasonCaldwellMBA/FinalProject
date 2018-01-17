angular.module('appModule')
	.component('certificationDetail',{
		templateUrl:'app/appModule/business/certification/certificationDetail/certificationDetail.component.html',
		controllerAs: 'vm',
		controller: function(certificationService, $location, $routeParams){
			var vm = this; 
			vm.certification = null; 
			
			certificationService.show($routeParams.certid).then(function(res){
					vm.certification = angular.copy(res.data); 
				}); 
			
			vm.updateCertification = function (certification) {
				certificationService.updateCertification(certification).then(function(res){
					reload(); 
				}); 
			}
			
			vm.destroy = function(){
				certificationService.destroy(certification).then(function (res) {
					reload(); 
				}); 
			}
			
			vm.return = function(){
				$location.path('business/' + $routeParams.bid + '/certification'); 
			}
			
			var reload = function () {
				certificationService.show($routeParams.certid).then(function(res){
					vm.certification = res.data; 
				}); 
			}
		}
	})