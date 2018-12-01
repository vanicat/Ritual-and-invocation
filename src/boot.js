/* global Phaser */

var boot = function (game) {
}

boot.prototype = {
  preload: function () {
    // TODO: loading asset this.load.image('loading', 'assets/loading.png')

    var scale = this.game.scale
    window.onresize = function () {
      scale.setGameSize(window.innerWidth * 0.95, window.innerHeight * 0.95)
      return false
    }
  },

  create: function () {
    console.log('booted')
    this.physics.startSystem(Phaser.Physics.ARCADE)

    this.game.state.start('Preload')
  }
}

var preload = function (game) {
}

preload.prototype = {
  preload: function () {
    // https://github.com/photonstorm/phaser-examples/blob/master/examples/loader/load%20events.js
    var loadingBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'loading')
    loadingBar.anchor.setTo(0.5, 0.5)
    this.load.setPreloadSprite(loadingBar)
    // should preload stuff
  },

  create: function () {
    console.log('preload done')
    this.state.start('TheGame')
  }
}
