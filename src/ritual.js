import { uuidv4 } from '../lib/misc.js'

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
    for (var action in this.actions) {
      var elem = document.createElement('a')
      elem.innerHTML = this.actions[action]
      elem.onclick = function () {
        console.log(action)
      }
      goals.appendChild(elem)

      elem = document.createElement('br')
      goals.appendChild(elem)
    }

    document.getElementById('ritual').appendChild(ritual)
  }
}

var job = {
  'desc': 'Ask for a better job',
  doIt: function (world) {
    if (world.job < 10) {
      world.job += 1
    }
  }

}
