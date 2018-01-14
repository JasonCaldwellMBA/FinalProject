angular.module('appModule')
    .component('requestDetail', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/request/requestDetail/requestDetail.component.html',
        controller: function (requestService, $location, $routeParams) {
            var vm = this; 
            vm.request = null; 
            vm.quotes = null; 
            requestService.show($routeParams.rid).then(function (res) {
                vm.request = angular.copy(res.data); 
            }); 
            
            vm.update = function (request) {
                requestService.update(request).then(function (res) {
                    reload();
                }); 
            }
            vm.destroy = function (id) {
                requestService.destroy(id).then(function (res) {
                    vm.return(); 
                }); 
            }
            vm.return = function () {
                $location.path('user/' +  $routeParams.uid + '/request'); 
            }
            var reload = function () {
                requestService.show($routeParams.rid).then(function (res) {
                    vm.request = angular.copy(res.data); 
                }); 
            }
        }
    }); 