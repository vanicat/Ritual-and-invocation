/* global fetch */
import { Animal, Demon } from './things.js'
import { Ritual } from './ritual.js'
import { Knowledge } from './knowledge.js'
import { world, updateWorld, acting } from './world.js'

export var stuffBlock
var ritualBlock
var dashboardBlock

var goodHealth = '♥'
var badHealth = '♡'

export function updateDisplay () {
  document.getElementById('money').innerHTML = '$ ' + world.money

  document.getElementById('health').innerHTML = goodHealth.repeat(world.health) + badHealth.repeat(5 - world.health)

  document.getElementById('doing').innerHTML = world.doing

  document.getElementById('waiting').innerHTML = '' + world.actions + ' of ' + world.goal
  document.getElementById('waiting').value = world.actions
  document.getElementById('waiting').max = world.goal
}

function working () {
  acting('working', 10, function () { world.money += world.jobQuality })
}

function buyAnnimal (species) {
  if (world.money >= Animal.def[species].cost) {
    world.money -= Animal.def[species].cost
    acting('buying', 5, function () {
      var animal = new Animal(species)
      animal.addingToHtml()
    })
  }
}

export default function main () {
  dashboardBlock = document.getElementById('dashboard')
  stuffBlock = document.getElementById('stuff')
  ritualBlock = document.getElementById('ritual')

  showBlockCreate(dashboardBlock)()

  document.getElementById('dashboardSelector').onclick =
    showBlockCreate(dashboardBlock)
  document.getElementById('stuffSelector').onclick =
    showBlockCreate(stuffBlock)
  document.getElementById('ritualSelector').onclick =
    showBlockCreate(ritualBlock)

  document.getElementById('working').onclick = working

  document.getElementById('buy-rat').onclick = function () { buyAnnimal('rat') }
  document.getElementById('buy-cat').onclick = function () { buyAnnimal('cat') }
  document.getElementById('buy-lamb').onclick = function () { buyAnnimal('lamb') }

  document.getElementById('updown-selected').parentElement.onclick = updownSelected

  updateDisplay()
  setInterval(updateWorld, world.actionPeriod)
}

function updownSelected (elem) {
  var basket = document.getElementById('basket')
  var button = document.getElementById('updown-selected')
  if (basket.style.height === '80vh') {
    basket.style.height = '10ex'
    button.innerHTML = '▲'
  } else {
    basket.style.height = '80vh'
    button.innerHTML = '▼'
  }
}

function showBlockCreate (block) {
  return function () {
  }
}

fetch('assets/animals.json')
  .then(res => res.json())
  .then(json => Animal.loadDef(json))

fetch('assets/rituals.json')
  .then(res => res.json())
  .then(function (json) {
    Ritual.def = json
    var r = new Ritual('simple')
    r.addingToHtml()
  })

fetch('assets/knowledge.json')
  .then(res => res.json())
  .then(json => Knowledge.loadDef(json))

fetch('assets/demon.json')
  .then(res => res.json())
  .then(json => Demon.loadDef(json))

document.getElementsByTagName('body')[0].onload = main
