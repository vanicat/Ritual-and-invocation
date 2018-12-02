/* global fetch */
import { Animal } from './things.js'
import { Ritual } from './ritual.js'

var membersBlock
export var stuffBlock
var ritualBlock
var visibleBlock
var dashboardBlock

var money = 0
var health = 5
var goodHealth = '♥'
var badHealth = '♡'
var actions = 0

function updateDisplay () {
  document.getElementById('money').innerHTML = '$ ' + money

  document.getElementById('health').innerHTML = goodHealth.repeat(health) + badHealth.repeat(5 - health)
  document.getElementById('actions').innerHTML = actions
}

function addActions () {
  actions += 1
  updateDisplay()
}

function working () {
  if (actions >= 10) {
    actions -= 10
    money += 5
  }
}

function buyAnnimal (species) {
  if (money >= Animal.def[species].cost) {
    money -= Animal.def[species].cost
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
  document.getElementById('buyKitten').onclick =
    function () { buyAnnimal('cat') }

  document.getElementById('updown-selected').parentElement.onclick = updownSelected

  updateDisplay()
  setInterval(addActions, 100)
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

var showBlockCreate = function (block) {
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
