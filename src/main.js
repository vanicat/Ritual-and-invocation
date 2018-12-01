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
  
}

var main = function () {
  dashboardBlock = document.getElementById('dashboard')
  membersBlock = document.getElementById('members')
  stuffBlock = document.getElementById('stuff')
  enemiesBlock = document.getElementById('enemies')

  visibleBlock = membersBlock
  showBlockCreate(dashboardBlock)()

  document.getElementById('dashboardSelector').onclick = showBlockCreate(dashboardBlock)
  document.getElementById('membersSelector').onclick = showBlockCreate(membersBlock)
  document.getElementById('stuffSelector').onclick = showBlockCreate(stuffBlock)
  document.getElementById('enemiesSelector').onclick = showBlockCreate(enemiesBlock)

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
/* Export: main */
