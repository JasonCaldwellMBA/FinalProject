angular.module('appModule')
	.component('navigation', {
		templateUrl : "app/appModule/navigation/navigation.component.html",
		controller: function ($location) {
			//Immediately navigate to the home page
//			$location.path('/home')
		},
		controllerAs: "vm"
	});