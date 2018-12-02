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

    document.getElementById('ritual').appendChild(ritual)
  }

  perform (action) {
    let ritual = ritualsList[action]
    let sacrifice = 0

    for (let stuff in world.selected) {
      const lamb = world.selected[stuff]
      if (lamb.value >= this.minCost) {
        sacrifice += world.selected[stuff].value
      }
      lamb.remove()
    }

    world.selected = []
    updateSelected()

    if (sacrifice >= this.cost) {
      ritual.doIt()
    }
  }
}

var job = {
  'desc': 'Ask for a better job',
  doIt: function () {
    if (world.jobQuality < 10) {
      world.jobQuality += 1
    }
  }

}

var ritualsList = {
  'job': job
}
