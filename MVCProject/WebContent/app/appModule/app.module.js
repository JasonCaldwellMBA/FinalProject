angular.module('appModule', ['ngRoute'])
.config(function($routeProvider){
	  $routeProvider
	    .when('/home', {
	      template : '<home></home>'
	    })
	    .when('/register', {
	    	template : '<register></register>'
	    })
	    .when('/login', {
	    	template : '<login></login>'
	    })
	    .when('/logout', {
	    	template : '<logout></logout>'
	    })
	    .otherwise({
	      template : '<not-found></not-found>'
	    })
	});