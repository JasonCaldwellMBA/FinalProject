angular.module('appModule')
    .component('businessDetail', {
        controllerAs: 'vm',
        templateUrl: 'app/appModule/business/businessDetail/businessDetail.component.html',
        controller: function (authService,businessService, userService, quoteService, $location, $routeParams, keyService, distanceMatrixService, notificationService) {
            var vm = this;
            vm.quotes = null;
            vm.business = null;
//            var business = null;
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
                    var c = vm.user.contact; 
                    vm.userAddress = c.address1.split(' ').join('+') + '+' + c.city + '+' + c.state + '+' + c.zipcode;
                    distanceMatrixService.geocode(vm.userAddress).then(function(res){
                    		let geometry = res.data.results.pop().geometry.location; 
                    		
                    		vm.user.contact.latitude = geometry.lat; 
                    		vm.user.contact.longitude = geometry.lng; 
                    }); 
                    notificationService.index(vm.user.id).then(function (res) {
                        vm.notifications = res.data; 
                        vm.size = vm.notifications.length; 
                    }); 
                }); 
                
                var b = vm.business.contact; 
                vm.businessAddress = b.address1.split(' ').join('+') + '+' + b.city + '+' + b.state +'+' +  b.zipcode; 
                distanceMatrixService.geocode(vm.businessAddress).then(function(res){
                	console.log(res)
                		let obj = res.data.results.pop().geometry.location
                		console.log(obj);
                		vm.business.contact.latitude = obj.lat;
                		vm.business.contact.longitude = obj.lng;
                		console.log(vm.business); 
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