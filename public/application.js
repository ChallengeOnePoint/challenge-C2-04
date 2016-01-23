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
  this.class   = 'display-small';
  this.kittens = Kitten.load();
  this.photoClass = 'col-sm-6 col-md-4';
}

AppController.prototype.display = function (mode) {
  this.class = 'display-' + mode;
  if (mode === 'big') {
    this.photoClass = 'col-sm-6 col-md-4';
  }
  else if (mode === 'small') {
    this.photoClass = 'col-sm-4 col-md-2';
  }
  else {
    //list view
  }
};
