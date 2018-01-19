angular.module('appModule')
    .component('settings', {
        controllerAs: 'vm', 
        templateUrl: 'app/appModule/user/settings/settings.component.html',
        controller: function (authService, userService, $routeParams, $location, authService, notificationService) {
            var vm = this; 
            vm.userId = authService.getToken(); 
            vm.user = null;
            vm.updatedUser = null; 
            
            //init load
            userService.show(authService.getToken()).then(function (res) {
                vm.user = angular.copy(res.data); 
                notificationService.index($routeParams.id).then(function (res) {
					vm.notifications = res.data; 
					vm.size = vm.notifications.length; 
					// if (res.data = null) {
					// 	vm.size = 0; 
					// }
				})
            });
            vm.updateUser = function(user) {
                userService.update(user).then(function (res) {
                    vm.user = res.data;
                    if (res.status >= 200 && res.status < 300) {
                        vm.updatedUser = res.data; 
                    }
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