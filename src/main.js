var membersBlock
var stuffBlock
var enemiesBlock
var visibleBlock
var actionBlock

var money = 0
var health = 5
var goodHealth = '♥'
var badHealth = '♡'
var actions = 0

var main = function () {
  actionBlock = document.getElementById('action')
  membersBlock = document.getElementById('members')
  stuffBlock = document.getElementById('stuff')
  enemiesBlock = document.getElementById('enemies')

  visibleBlock = membersBlock
  showBlockCreate(actionBlock)()

  document.getElementById('actionSelector').onclick = showBlockCreate(actionBlock)
  document.getElementById('membersSelector').onclick = showBlockCreate(membersBlock)
  document.getElementById('stuffSelector').onclick = showBlockCreate(stuffBlock)
  document.getElementById('enemiesSelector').onclick = showBlockCreate(enemiesBlock)
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
