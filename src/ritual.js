import { uuidv4, addText, addBr } from '../lib/misc.js'
import { world, acting } from './world.js'
import { updateSelected, Demon } from './things.js'
import { Knowledge } from './knowledge.js'

export class Ritual {
  constructor (name) {
    let ritualdesc = Ritual.def[name]
    Object.assign(this, ritualdesc)
    this.htmlId = uuidv4()
  }

  addingToHtml () {
    var ritual = document.getElementById('ritual_skel').cloneNode(true)
    ritual.id = this.htmlId

    ritual.getElementsByClassName('desc')[0].innerHTML = this.desc

    if (this.img) {
      ritual.getElementsByTagName('img')[0].src = this.img
    }

    var goals = ritual.getElementsByClassName('goals')[0]
    for (let action in this.actions) {
      let elem = document.createElement('a')
      elem.innerHTML = this.actions[action]
      let me = this
      elem.onclick = function () {
        me.perform(action)
      }
      goals.appendChild(elem)

      addBr(goals)
    }

    document.getElementById('ritual-list').appendChild(ritual)
  }

  perform (action) {
    let ritual = ritualsList[action]
    let sacrifice = 0

    let elem = document.getElementById('ritual-result').cloneNode(true)
    elem.id = null
    document.getElementById('ritual-result-list').appendChild(elem)

    elem.onclick = function () {
      elem.parentElement.removeChild(elem)
    }

    for (let stuff in world.selected) {
      const lamb = world.selected[stuff]
      addBr(elem)
      if (lamb.value >= this.minCost) {
        if (sacrifice > this.cost * 1.5) {
          addText(elem, 'The unknowable force are full with power')
          addBr(elem)
        }
        sacrifice += world.selected[stuff].value
        addText(elem, 'The essence of ' + lamb.name + ' has been consumed')
      } else {
        addText(elem, 'The essence of ' + lamb.name + ' has been refused, it has no value')
      }
      lamb.remove()
    }

    world.selected = []
    updateSelected()

    addBr(elem)

    var me = this

    acting('casing ritual', this.level * 5, function () {
      if (sacrifice >= me.cost) {
        addText(elem, 'The price has been paid. The deed is done.')

        ritual(elem)
      } else {
        if (world['first-error']) {
          addText(elem, 'The price has not been matched. Next time you will suffer the consequences.')
          world['first-error'] = false
        } else {
          addText(elem, 'The price has not been matched. Let your body pay what is missing.')
          world.health -= 1
        }
      }
    })
  }
}

function job (level, elem) {
  if (world.jobQuality < 10 * level) {
    world.jobQuality += level
  } else {
    addBr(elem)
    addText(elem, 'This ritual cannot help you anymore for this')
  }
}

function knowledge (level, elem) {
  let available = Knowledge.def.filter(x => x.value <= level)

  addBr(elem)

  if (available == null || available.length <= 0) {
    addText(elem, 'There is nothing new to be know with this level of power.')
  } else {
    let i = Math.floor(Math.random() * (available.length * (level + 1)))
    if (i < available.length) {
      addText(elem, 'You found a new ' + available[i].type)
      Knowledge.learn(available[i].name)
    } else if (i < available.length * 2) {
      addText(elem, 'You didn\'t understood what was uttered to you.')
    } else {
      let demon = new Demon()
      demon.addingToHtml()
      addText(elem, 'Small error can lead to dangerous consequence:')
      addBr(elem)
      addText(elem, demon.name + ' know you. It went to look for your souls.')
    }
  }
}

function forever (elem) {
  window.location = 'winning.html'
}

var ritualsList = {
  'job1': function (elem) { job(1, elem) },
  'job2': function (elem) { job(2, elem) },
  'job3': function (elem) { job(3, elem) },
  'knowledge1': function (elem) { knowledge(1, elem) },
  'knowledge2': function (elem) { knowledge(2, elem) },
  'knowledge3': function (elem) { knowledge(3, elem) },
  'knowledge4': function (elem) { knowledge(4, elem) },
  'forever': forever
}
