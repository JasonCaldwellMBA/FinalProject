angular.module('appModule')
    .component('certification', {
        templateUrl: 'app/appModule/business/certification/certification.component.html',
        controllerAs: 'vm',
        controller: function (certificationService, $cookies, $location,
				$routeParams) {
        		var vm = this;
			vm.certifications = [];

			certificationService.index().then(function(res) {
				vm.certifications = res.data;
			});
			
//			vm.detailView = function(id) {
//				$location.path('business/' + $cookies.get('bizId')
//						+ '/certification/' + id);
//			}
			
			vm.addCertification = function (certification) {
				certification.active = true; 
				certificationService.addCertification(certification).then(function(res){
					reload(); 
				}); 
			}
			
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