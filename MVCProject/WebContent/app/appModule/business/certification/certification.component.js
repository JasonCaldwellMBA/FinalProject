angular.module('appModule')
    .component('certification', {
        templateUrl: 'app/appModule/business/certification/certification.component.html',
        controllerAs: 'vm',
        controller: function (certificationService, $cookies, $location,
				$routeParams, authService) {
        		var vm = this;
			vm.certifications = [];
			vm.bizId = authService.getBusToken();
			
			vm.detailView = function(certid) {
				$location.path('business/' + authService.getBusToken() + '/certification/' + certid);
			}

			certificationService.index().then(function(res) {
				vm.certifications = res.data;
			});
			
			vm.addCertification = function (certification) {
				certificationService.addCertification(certification).then(function(res){
					reload(); 
				}); 
			}
//			
//			vm.updateCertification = function (certification) {
//				certificationService.updateCertification(certification).then(function(res){
//					reload(); 
//				}); 
//			}
			
			vm.destroy = function(id) {
				certificationService.destroy(id).then(function (res) {
					reload();
				})
			}
			
			var reload = function() {
				certificationService.index().then(function(res) {
					vm.certifications = res.data;
				});
			}
			
			vm.return = function(){
				$location.path('/business/' + $routeParams.id); 
			}
        }
    })