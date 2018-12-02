/* global fetch */
import { Animal } from './things.js'
import { Ritual } from './ritual.js'
import { world } from './world.js'

var membersBlock
export var stuffBlock
var ritualBlock
var visibleBlock
var dashboardBlock

var goodHealth = '♥'
var badHealth = '♡'

function updateDisplay () {
  document.getElementById('money').innerHTML = '$ ' + world.money

  document.getElementById('health').innerHTML = goodHealth.repeat(world.health) + badHealth.repeat(5 - world.health)
  document.getElementById('actions').innerHTML = world.actions
}

function addActions () {
  world.actions += 1
  updateDisplay()
}

function working () {
  if (world.actions >= 10) {
    world.actions -= 10
    world.money += world.jobQuality
  }
}

function buyAnnimal (species) {
  if (world.money >= Animal.def[species].cost) {
    world.money -= Animal.def[species].cost
    var animal = new Animal(species)
    animal.addingToHtml()
  }
}

export default function main () {
  dashboardBlock = document.getElementById('dashboard')
  membersBlock = document.getElementById('members')
  stuffBlock = document.getElementById('stuff')
  ritualBlock = document.getElementById('ritual')

  visibleBlock = membersBlock
  showBlockCreate(dashboardBlock)()

  document.getElementById('dashboardSelector').onclick =
    showBlockCreate(dashboardBlock)
  document.getElementById('membersSelector').onclick =
    showBlockCreate(membersBlock)
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
  setInterval(addActions, world.actionPeriod)
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
    visibleBlock.style.visibility = 'hidden'
    visibleBlock.style.position = 'absolute'
    block.style.visibility = 'visible'
    block.style.position = 'inherit'
    visibleBlock = block
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
  }
  )
document.getElementsByTagName('body')[0].onload = main
