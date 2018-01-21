angular.module('appModule')
    .component('settings', {
        controllerAs: 'vm', 
        templateUrl: 'app/appModule/user/settings/settings.component.html',
        controller: function (authService, userService, $routeParams, $location, authService, notificationService, distanceMatrixService) {
            var vm = this; 
            vm.userId = authService.getToken(); 
            vm.user = null;
            vm.updatedUser = null; 
            vm.updateFlag = false;
            

            if (authService.isUser() == false) {
				var id = authService.getToken(); 
                $location.path('/login'); 
            }
            
            //init load
            userService.show(authService.getToken()).then(function (res) {
            		vm.user = res.data; 
                vm.updatedUser = angular.copy(res.data); 
                notificationService.index($routeParams.id).then(function (res) {
					vm.notifications = res.data; 
					vm.size = vm.notifications.length; 
				})
            });
            vm.updateUser = function(user) {
            	let c = user.contact; 
                let address = c.address1.split(' ').join('+') + '+' + c.city + '+' + c.state + '+' + c.zipcode;
                distanceMatrixService.geocode(address).then(function(res){
                		let geometry = res.data.results.pop().geometry.location; 
                		
                		user.contact.latitude = geometry.lat; 
                		user.contact.longitude = geometry.lng;
                		
                		userService.update(user).then(function (res) {
                			vm.user = res.data;
                			vm.updatedUser = angular.copy(res.data); 
                			vm.updateFlag = true;
                			console.log(res);
                		}); 
                }); 
            }
            vm.destroyAccount = function () {
                userService.destroy().then(function (res) {
                    authService.logout();
                    $location.path('/home');
                });
            }
            vm.return = function (user) {
                $location.path('user/' + $routeParams.id); 
            }

            //Helper methods
            var reload = function () {
                var id = authService.getToken(); 
                userService.show(id).then(function (res) {
                    vm.user = angular.copy(res.data);
                }); 
            }
            vm.getHome = function () {
				$location.path("/user/" + $routeParams.id); 
			}
			vm.getVehicles = function () {
				$location.path("/user/" + $routeParams.id + "/vehicle");
			}
			vm.getSettings = function () {
				$location.path("/user/" + $routeParams.id + '/settings');
			}
			vm.getRequests = function () {
				$location.path("/user/" + $routeParams.id + "/request");
			}
			vm.getBusiness = function (business) {
				$location.path("/user/" + $routeParams.id + "/business/" + business.id)
			}
			vm.getNotifications = function () {
				$location.path('/user/' + $routeParams.id + '/notification');
			}
        }
    })