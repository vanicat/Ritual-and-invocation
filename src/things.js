/* global */
import { stuffBlock } from './main.js'
import { uuidv4 } from '../lib/misc.js'

var stuffList = {}
export class Animal {
  constructor (species) {
    var nbNames = Animal.def[species].names.length
    var n = Math.floor(Math.random() * nbNames)
    var name = Animal.def[species].names[n]

    this.name = name
    this.species = species
    this.htmlId = uuidv4()
    this.img = Animal.def[species].img
    stuffList[this.htmlId] = this
  }

  remove () {
    var element = document.getElementById('htmlId')
    element.parentNode.removeChild(element)
    delete stuffList[this.htmlId]
  }

  addingAnimalToHtml () {
    var animal = document.getElementById('animal').cloneNode(true)
    animal.id = this.htmlId
    animal.getElementsByTagName('img')[0].src = this.img
    animal.getElementsByClassName('name')[0].innerHTML = this.name
    animal.getElementsByClassName('species')[0].innerHTML = this.species

    stuffBlock.appendChild(animal)
  }
}

Animal.loadDef = function (json) {
  Animal.def = json
}
