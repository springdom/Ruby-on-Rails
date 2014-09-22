(function() { // We use this anonymous function to create a closure.
    var app = angular.module('splatter-web', ['ngResource']);
    app.factory('User', function($resource) {
        return $resource('http://taylor.sqrawler.com/api/users/:id.json', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            },
            'mySplatts': {
                method: 'GET',
                url: "http://taylor.sqrawler.com/api/users/splatts/:id.json",
                isArray: true
            },
            'myFeeds': {
                method: 'GET',
                url: "http://taylor.sqrawler.com/api/users/splatts-feed/:id.json",
                isArray: true
            },
            'addSplatt': {
                method: 'POST',
                url: "http://taylor.sqrawler.com/api/splatts.json"
            },
            'follow': {
                method: 'POST',
                url: 'http://taylor.sqrawler.com/api/users/follows/'
            },
            'unfollow': {
                method: 'DELETE',
                url: 'http://taylor.sqrawler.com/api/users/follows/:id/:follows_id'
            }
        });
    });
    app.factory('Splatt', function($resource) {
        return $resource('http://.sqrawler.com/api/splatts/:id.json', {}, {
            save: {
                method: 'POST',
                url: 'http://.sqrawler.com/api/splatts'
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
            console.log(this.getUser);
        };
        //user login and CRUD
        this.login = function() {
            this.loggedin_user = this.getUser(this.data.id);
            this.splatts = User.mySplatts({
                id: this.data.id
            });
            this.feeds = User.myFeeds({
                id: this.data.id
            });
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
        };
        //Splatts
        this.PostSplatt = function() {
            postData = {
                "splatt": {
                    "body": this.data.splattbody,
                    "user_id": this.loggedin_user.id
                }
            }
            User.addSplatt({}, postData);
            this.data = {}
        };
        this.feedinfo = function() {
            this.info_user = this.getUser(this.data.infoid);
            this.feed = User.mySplatts({
                id: this.data.infoid
            });
            this.data = {};
        };
        //Follow Unfollow
        this.Follow = function() {
            var user_id = this.loggedin_user.id;
            var follows_id = this.data.follows_id;
            User.follow({
                id: user_id,
                follows_id: follows_id
            });
            this.data = {};
        };
        this.Unfollow = function() {
            var user_id = this.loggedin_user.id;
            var unfollow_id = this.data.unfollow_id;
            User.follow({
                id: this.user_id,
                follows_id: this.follows_id
            });
            this.data = {};
            this.data = {};
        };
    });
})();
