import { uuidv4 } from '../lib/misc.js'
import { world } from './world.js'
import { updateSelected } from './things.js'

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

    var goals = ritual.getElementsByClassName('goals')[0]
    for (let action in this.actions) {
      let elem = document.createElement('a')
      elem.innerHTML = this.actions[action]
      let me = this
      elem.onclick = function () {
        me.perform(action)
      }
      goals.appendChild(elem)

      elem = document.createElement('br')
      goals.appendChild(elem)
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
      elem.appendChild(document.createElement('br'))
      if (lamb.value >= this.minCost) {
        if (sacrifice > this.cost * 1.5) {
          let text = document.createTextNode('The unknowable force are full with power')
          elem.appendChild(text)
          elem.appendChild(document.createElement('br'))
        }
        sacrifice += world.selected[stuff].value
        let text = document.createTextNode('The essence of ' + lamb.name + ' has been consumed')
        elem.appendChild(text)
      } else {
        let text = document.createTextNode('The essence of ' + lamb.name + ' has been refused, it has no value')
        elem.appendChild(text)
      }
      lamb.remove()
    }

    world.selected = []
    updateSelected()

    elem.appendChild(document.createElement('br'))

    if (sacrifice >= this.cost) {
      let text = document.createTextNode('The price has been paid. The deed is done.')
      elem.appendChild(text)

      ritual(elem)
    } else {
      if (world['first-error']) {
        let text = document.createTextNode('The price has not been matched. Next time you will suffer the consequences.')
        elem.appendChild(text)
        world['first-error'] = false
      } else {
        let text = document.createTextNode('The price has not been matched. Let your body pay what is missing.')
        elem.appendChild(text)
        world.health -= 1 // TODO: dying
      }
    }
  }
}

function job (level, elem) {
  if (world.jobQuality < 10 * level) {
    world.jobQuality += level
  }
}

var ritualsList = {
  'job1': function (elem) { job(1, elem) }
}
