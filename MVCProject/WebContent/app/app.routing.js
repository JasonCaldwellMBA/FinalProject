angular.module('appModule')
	.config(function($routeProvider){
	$routeProvider
    	.when('/home', {
    			template : '<home></home>'
		})
		.when('/register', {
			template: '<register></register>'
		})
	    .when('/login', {
	    		template : '<login></login>'
	    })
	    .when('/logout', {
	    		template : '<logout></logout>'
	    })
	    .when('/businessHome',{
	    	template: '<business-component></business-component>'
	    })
	    .when('/userComponent',{
	    	template: '<user-component></user-component>'
	    })
	    .otherwise({
	    		template : '<not-found></not-found>'
	    })
});
