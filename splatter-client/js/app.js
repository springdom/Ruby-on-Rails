(function() { // We use this anonymous function to create a closure.
    var app = angular.module('splatter-web', ['ngResource']);
    app.factory('User', function($resource) {
        return $resource('http://taylor.sqrawler.com/api/users/:id.json', {
            id: '@id'},
        {'save': {method: 'POST', url: "http://mcpherson.sqrawler.com/api/users.json"},
         'update': {method:'PUT'}
        });
    });
    app.controller('UserController', function(User, $scope) {
        this.data = {};
        this.ulist = User.query();
        this.getUser = function(i) {
            return User.get({
                id: i
            });
        };
        this.login = function() {
            this.loggedin_user = this.getUser(this.data.id);
            this.data = {};
        };
        this.updateUser = function() {
            this.loggedin_user.name = this.data.name;
            this.loggedin_user.email = this.data.email;
            this.loggedin_user.blurb = this.data.blurb;
            this.loggedin_user.$update();
            this.data = {};
        };
        this.createUser = function() {
            u = new User();
            u.name = this.data.cname;
            u.email = this.data.cemail;
            u.password = this.data.cpassword;
            u.blurb = this.data.cblurb;
            u.$save();
            this.data = {};
        };
        this.delUser = function() {
            //alert("Deleting "+ this.data.delid);
            User.delete({
                id: this.data.delid
            });
            //get your user from where ever.
            var user = getSomeUser();

            // set your user permissions
            // here's some contrived example.
        };
    });
})();
