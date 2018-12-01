/* global fetch, animals */

var membersBlock
var stuffBlock
var enemiesBlock
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

var animalsDef

function buyAnnimal (species) {
  if (money >= animalsDef[species].cost) {
    money -= animalsDef[species].cost
    var animal = new Animal(species)
    animal.addingAnimalToHtml()
  }
}

function loadAnimals (json) {
  animalsDef = json
}

function main () {
  dashboardBlock = document.getElementById('dashboard')
  membersBlock = document.getElementById('members')
  stuffBlock = document.getElementById('stuff')
  enemiesBlock = document.getElementById('enemies')

  visibleBlock = membersBlock
  showBlockCreate(dashboardBlock)()

  document.getElementById('dashboardSelector').onclick =
    showBlockCreate(dashboardBlock)
  document.getElementById('membersSelector').onclick =
    showBlockCreate(membersBlock)
  document.getElementById('stuffSelector').onclick =
    showBlockCreate(stuffBlock)
  document.getElementById('enemiesSelector').onclick =
    showBlockCreate(enemiesBlock)

  document.getElementById('working').onclick = working
  document.getElementById('buyKitten').onclick =
    function () { buyAnnimal('cat') }

  fetch('assets/animals.json')
    .then(res => res.json())
    .then(json => loadAnimals(json))

  updateDisplay()
  setInterval(addActions, 1000)
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
