(function() { // We use this anonymous function to create a closure.
	var app = angular.module('splatter-web', ['ngResource']);

	
	app.factory('User', function($resource) { //User call
		return $resource('http://taylor.sqrawler.com/api/users/:id.json', {},
	{update: {method:'PUT', url:'http://taylor.sqrawler.com/api/users/:id.json'}}
	)});
	app.factory('Splatt', function($resource) { //splatt feed call
		return $resource('http://taylor.sqrawler.com/api/splatts/:id.json'
	)});
	
	//Global Variables
	var uid= 2;
	
	//UserLogin
	app.controller("UserLoginController", function() {

	});
	
	//Registration
	app.controller("UserRegistrationController", function() {
		
	
	});
		
	//Form Controller
	app.controller("UpdateFormController", function() {
		this.data = {};
		this.updateUser = function(user) {
		user.u.name = this.data.name;
		this.data = {};
		} 
	});
	//user Controller
	app.controller('UserController', function(User) {
	this.u = User.get({id:uid});
	});
	
	//Splatt Controller
	app.controller('SplattController', function(Splatt) {
	// add your user code below
	this.feed = Splatt.get({id:uid});
	
	});
})();
