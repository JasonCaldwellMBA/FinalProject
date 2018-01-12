angular.module('appModule')
.component('user', {
	templateUrl : 'app/appModule/user/user.component.html',
	controller : function($routeParams, todoService, $filter, $location, $cookies) {
		var vm = this;
		
		vm.users = [];
		
//========================Show===========================//
		
		if (!vm.selected && parseInt($routeParams.userId)) {
    		todoService.show($routeParams.userId)
    			.then(function(response) {
    				console.log(response);
    				
    				vm.selected = response.data;
    			})
    			.catch(function(response) {
    				console.log(response)
    				$location.path('/user-not-found')
    			})
    }
		
//=========================Reload===========================//
		
		var reloadTodos = function() {
    		vm.message = "LOADING...."
    		userService.index()
    			.then(function(res) {
    				console.log(res.data);
    				vm.users = res.data;
    				vm.message = null;
    			})
    			.catch(console.error);
    }
    
    reloadUsers();
    
   
    vm.addUser = function(user) {
    		userService.create(user)
    			.then(function(res) {
    				reloadUser();
    			})
    }
    
//============================Update=============================//
    
    vm.updateUser = function(edittedUser) {
		userService.update(edittedUser)
			.then(function(res) {
				reloadUsers();
				vm.selected = vm.editUser; 
				vm.editUser = null;	    		
			})
}
    
    vm.deleteUser = function(id) {
		userService.destroy(id)
			.then(function(res) {
				reloadUsers();
			})
}   