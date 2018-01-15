angular.module('appModule')
    .component('businessDetail', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/business/businessDetail/businessDetail.component.html',
        controller: function (businessService, quoteService, $location, $routeParams) {
            var vm = this; 
            vm.business = null; 
            vm.quotes = null; 
            //init load
            businessService.show($routeParams.bid).then(function (res) {
                vm.business = angular.copy(res.data);
            }); 
        
            vm.update = function (business) {
                businessService.update(request).then(function (res) {
                    reload();
                }); 
            }
            vm.destroy = function (id) {
                businessService.destroy(id).then(function (res) {
                    vm.return(); 
                }); 
            }
//            vm.return = function () {
//                $location.path('user/' +  $routeParams.uid + '/business'); 
//            }
            var reload = function () {
                businessService.show($routeParams.rid).then(function (res) {
                    vm.business = angular.copy(res.data); 
                }); 
            }
        }
    }); 