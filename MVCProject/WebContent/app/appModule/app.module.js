angular.module('appModule', ['ngRoute'])
.config(function($routeProvider){
	  $routeProvider
	    .when('/home', {
	      template : '<home></home>'
	    })
	    .when('/about', {
	      template : '<about></about>'
	    })
	    .when('/contact', {
	    	template : '<contact></contact>'
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