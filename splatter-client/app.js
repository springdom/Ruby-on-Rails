(function() { // We use this anonymous function to create a closure.
	var app = angular.module('splatter-web', ['ngResource']);

	app.factory('User', function($resource) {
		return $resource('http://taylor.sqrawler.com/api/users/:id.json', {},
		'http://taylor.sqrawler.com/api/splatts/:id.json',
	{update: {method:'PUT', url:'http://taylor.sqrawler.com/api/users/:id.json'}}
	)});
	app.factory('Splatt', function($resource) {
		return $resource('http://taylor.sqrawler.com/api/splatts/:id.json'
	)});
	var uid= 2;
	var uid2 =2;
	//user Controller
	app.controller('UserController', function(User) {
	
	// add your user code below
	this.u = User.get({id:uid});
	
// add your user code above
	});
	//splatt Controller
	app.controller('SplattController', function(Splatt) {
	// add your user code below
	this.feed = Splatt.get({id:uid});
	
// add your user code above
	});
	//form Controller
	app.controller("UpdateFormController", function() {
		this.data = {};
		this.updateUser = function(user) {
		user.u.name = this.data.name;
		this.data = {};
		} 
	});

})();
