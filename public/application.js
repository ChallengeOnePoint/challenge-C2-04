'use strict';

angular
  .module('app', ['angular-flexslider'])
  .factory('Kitten', kittenFactory)
  .controller('AppController', AppController);

function kittenFactory ($http) {
  var KITTEN_URL = '/cats/kittenIdentity.json';

  return {
    kittens: angular.extend([], { $resolved: false }),
    load: load
  };

  function load () {
    var self = this;

    $http.get(KITTEN_URL).then(function (res) {
      self.kittens.length = 0;
      self.kittens.push.apply(self.kittens, res.data);
      self.kittens.$resolved = true;
    });

    return self.kittens;
  }
}

function AppController (Kitten) {
  this.kittens = Kitten.load();
}
