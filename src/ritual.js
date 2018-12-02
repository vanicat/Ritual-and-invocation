import { uuidv4 } from '../lib/misc.js'

export class Ritual {
  constructor (name) {
    var ritualdesc = Ritual.def[name]
    this.name = ritualdesc['name']
    this.desc = ritualdesc['desc']
    this.actions = ritualdesc['actions']
    this.cost = ritualdesc['cost']
    this.minCost = ritualdesc['minCost']
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
