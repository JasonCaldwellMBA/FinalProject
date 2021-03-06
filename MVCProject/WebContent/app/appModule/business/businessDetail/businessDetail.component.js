angular.module('appModule')
    .component('businessDetail', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/business/businessDetail/businessDetail.component.html',
        controller: function (authService,businessService, userService, quoteService, $location, $routeParams, keyService, distanceMatrixService, notificationService) {
            var vm = this;
            vm.quotes = null;
            vm.business = null;
            vm.user = null;
            vm.notifications = null; 
            vm.size = null;
            vm.businessAddress = null; 
            vm.userAddress = null; 
            
            
            if (authService.isUser() == false) {
                $location.path('/login'); 
            }
            
            var key = keyService.getGoogleAPIKey();
            vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + key;
            //init load
            
            businessService.show($routeParams.bid).then(function (res) {
                vm.business = res.data;
                userService.show($routeParams.uid).then(function (res) {
                    vm.user = res.data; 
                    notificationService.index(vm.user.id).then(function (res) {
                        vm.notifications = res.data; 
                        vm.size = vm.notifications.length; 
                    }); 
                }); 
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
            var reload = function () {
                businessService.show($routeParams.rid).then(function (res) {
                    vm.business = angular.copy(res.data);
                });
            }

            vm.getHome = function () {
                $location.path("/user/" + $routeParams.uid);
            }
            vm.getVehicles = function () {
                $location.path("/user/" + $routeParams.uid + "/vehicle");
            }
            vm.getSettings = function () {
                $location.path("/user/" + $routeParams.uid + '/settings');
            }
            vm.getRequests = function () {
                $location.path("/user/" + $routeParams.uid + "/request");
            }
            vm.getBusiness = function (business) {
                $location.path("/user/" + $routeParams.uid + "/business/" + business.id)
            }
            vm.getNotifications = function () {
                $location.path('/user/' + $routeParams.uid + '/notification');
            }
        }
    }); 