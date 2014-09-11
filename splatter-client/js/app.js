(function() { // We use this anonymous function to create a closure.
    var app = angular.module('splatter-web', ['ngResource']);
    app.factory('User', function($resource) {
        return $resource('http://taylor.sqrawler.com:3000/users/:id.json', {
            id: '@id'
        }, {
            update: {
                method: 'PUT',
                url: 'http://taylor.sqrawler.com/api/users/:id.json',
                isArray: true
            },
            save: {
                method: 'POST',
                url: 'http://taylor.sqrawler.com:3000/users/',
                isArray: true
            },
            listSplatt: {
                method: 'GET',
                url: 'http://taylor.sqrawler.com/api/users/splatts-feed/:id',
                isArray: true
            },
            splatts: {
                method: 'GET',
                url: 'http://taylor.sqrawler.com/api/users/splatts/:id',
                isArray: true
            },
        });
    });
    app.factory('Splatt', function($resource) {
        return $resource('http://taylor.sqrawler.com/api/splatts/:id.json', {}, {
            save: {
                method: 'POST',
                url: 'http://taylor.sqrawler.com/api/splatts'
            }
        })
    });
    var error = null;
    app.controller('UserController', function(User) {
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

            // regexp from https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js#L4
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
            u.$save({
                user: {
                    name: u.name,
                    email: u.email,
                    password: u.password,
                    blurb: u.blurb
                }
            });
            console.log(u);
            this.data = {};
        };
        this.delUser = function() {
            //alert("Deleting "+ this.data.delid);
            User.delete({
                id: this.data.delid
            });
        };
    });
    /* Splatts Controller*/
    app.controller('SplattsController', function(Splatt) {
        this.data = {};

        this.SplattsFeed = function() {
            this.data = {};
            this.viewSplatt = function() {
                splatts_feed = this.data.splatts_feed;
                this.splatts_feed = User.listSplatt({
                    id: this.data.id
                });
                this.data = {};
            }
        };
        this.ViewInformation = function() {
            this.data = {};
            this.viewInfo = function() {
                var user_id = this.data.id;
                this.u = User.get({
                    id: user_id
                });
                this.splatts = User.splatts({
                    id: user_id
                });
                this.data = {};
            }
        };
        this.createSplatt = function() {
            this.data = {};
            this.composeSplatt = function() {
                var body = this.data.body;
                var id = this.data.id;
                Splatt.save({
                    splatt: {
                        body: body,
                        user_id: id
                    }
                });
                this.data = {};
            }
        };
    });

})();
