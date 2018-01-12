angular.module('appModule')
	.config(function($routeProvider){
	$routeProvider
		.when('/register', {
			template: '<register></register>'
		})
		.when('/businessHome',{
			template: '<bus_component></bus_component>'
		})
});