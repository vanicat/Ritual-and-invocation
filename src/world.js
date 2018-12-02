import { updateDisplay } from './main.js'

export var world = {
  'money': 20,
  'actions': 0,
  'doing': 'nothing',
  'goal': 1,
  'success': function () {},
  'actionPeriod': 100, // in milisec
  'health': 5,
  'jobQuality': 5,
  'selected': [],
  'stuff': {},
  'ritual': [],
  'first-error': true
}

export function acting (name, goal, done) {
  world.doing = name
  world.goal = goal
  world.actions = 0
  world.success = done

  updateDisplay()
}

export function updateWorld () {
  if (world.doing === 'nothing') {
    world.actions = 1
  } else {
    world.actions += 1

    if (world.actions >= world.goal) {
      world.success()
      world.actions = 1
      world.goal = 1
      world.doing = 'nothing'
      world.success = function () {}
    }
  }
  updateDisplay()

  if (world.health <= 0) {
    window.location = 'dead.html'
  }
}
