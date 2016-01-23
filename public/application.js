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

function AppController (Kitten, $timeout) {
  var vm = this;

  this.class   = 'display-small';
  this.kittens = Kitten.load();
  this.photoClass = 'col-sm-6 col-md-4';
  this.diaporamaVisible = false;
  this.diaporamaIndex = 0;
  this.diaporamaKitten = null;
  this.diaporamaTimeout = null;

  this.kittens = Kitten.load();

  this.toggleDiaporama = function () {
    this.diaporamaVisible = !this.diaporamaVisible;

    if (this.diaporamaVisible) {
      $timeout(this.diaporamaNext, 3000);
    } else if (this.diaporamaTimeout) {
      // release
      this.diaporamaTimeout();
    }
  };

  this.scheduleNextDiaporama = function () {
    if (vm.diaporamaTimeout) {
      // release
      $timeout.cancel(vm.diaporamaTimeout);
    }

    vm.diaporamaTimeout = $timeout(vm.diaporamaNext, 1000);
  };

  this.diaporamaNext = function () {
    vm.diaporamaIndex += 1;

    if (vm.diaporamaIndex >= vm.kittens.length) {
      vm.diaporamaIndex = 0;
    }

    vm.diaporamaKitten = vm.kittens[vm.diaporamaIndex];

    vm.scheduleNextDiaporama();
  };
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
    this.photoClass = 'col-md-12';
  }
};
