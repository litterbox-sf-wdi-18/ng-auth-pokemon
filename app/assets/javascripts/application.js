// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require angular/angular
//= require angular-route/angular-route
//= require_tree .

var pokeApp = angular.module("PokeApp", [
  "ngRoute"
]);

// Authenticity token
pokeApp.config(["$httpProvider", function ($httpProvider){
  $httpProvider.defaults.headers.common["X-CSRF-Token"] = $("meta[name=csrf-token]").attr("content")
}])

pokeApp.config(["$routeProvider",  "$locationProvider",  function ($routeProvider, $locationProvider) {
  $routeProvider.
    when("/", {
      templateUrl: "app/index.html",
      controller: "SiteCtrl"
    }).
    when("/account", {
      templateUrl: "app/account.html",
      controller: "AccountCtrl"
    })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}])

pokeApp.factory("User", ["$http", "$location", function ($http, $location) {
  var api  = {};


  api.currentUser = null;

  // Private func
  function setCurrentUser (user) {
    api.currentUser = user;
    localStorage.api_token = user.api_token;
  }

  api.getCurrentUser = function getCurrentUser(cb) {
    var api_token = localStorage.api_token;
    
    if (api.currentUser) {
      cb(api.currentUser)
    }

    if (api_token) {
      $http.get("/users/"+api_token).
        success(function (data) {
          console.log(data)
          setCurrentUser(data);
          cb(api.currentUser);
        }).error(function () {
          cb(null);
        })
    }
  }

  api.getCurrentUser(function (user){
    api.currentUser = user;
  });

  api.login = function login(params) {
    return $http.post("/sessions", {user: params}).
        success(function (data) {
          setCurrentUser(data);
          $location.path("/account")
        }).
        error(function (data) {
          alert("Login Failed")
        })
  }

  api.signup = function signup(params) {
    return $http.post("/users", {user: params}).
      success(function (data) {
        setCurrentUser(data)
        $location.path("/account")
      }).
      error(function (data) {
        alert("SIGNUP Failed")
      })
  }

  api.logout = function logout() {
    api.currentUser = null
  }

  api.requireLogin = function require_login(isLoggedIn) {
    api.getCurrentUser(function (currentUser){
      console.log("REQUIRED!", currentUser)
      if (!currentUser) {
        console.log(currentUser)
        $location.path("/")
      } else {
        isLoggedIn(currentUser)
      }
    })
  }
  return api;
}]);


pokeApp.controller("MainCtrl", ["$scope", "User", function ($scope, User) {
  $scope.greeting="Hello"
}]);


pokeApp.controller("SiteCtrl", ["$scope", "User", function ($scope, User) {
  $scope.signup = function signup() {
    User.signup($scope.newUser)
  }
}]);



pokeApp.controller("AccountCtrl", ["$scope", "User", function ($scope, User) {
  
  User.requireLogin(function (currentUser) {
    $scope.account = currentUser
  })

}]);




