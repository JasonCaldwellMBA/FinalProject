angular.module('appModule')
	.config(function($routeProvider){
	$routeProvider
		.when('/register', {
			template: '<register></register>'
		})
});