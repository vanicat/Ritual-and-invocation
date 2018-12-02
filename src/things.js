/* global */
import { stuffBlock } from './main.js'
import { uuidv4, addText } from '../lib/misc.js'
import { world } from './world.js'

export function getStuffById (htmlId) {
  return world.stuff[htmlId]
}

function toggleSelectStuff (htmlId) {
  var stuff = getStuffById(htmlId)
  var i = world.selected.indexOf(stuff)
  if (i === -1) {
    world.selected.push(stuff)
  } else {
    world.selected.splice(i, 1)
  }
  updateSelected()
}

export function updateSelected () {
  var i, stuff, elem
  var div = document.getElementById('selected-stuff')
  div.innerHTML = ''

  for (i in world.selected) {
    stuff = world.selected[i]
    elem = document.getElementById(stuff.htmlId).cloneNode(true)
    elem.id = elem.id + 'clone'
    elem.onclick = function () {
      toggleSelectStuff(stuff.htmlId)
    }
    div.appendChild(elem)
  }
}

export class Animal {
  constructor (species) {
    Object.assign(this, Animal.def[species])
    let nbNames = this.names.length
    let n = Math.floor(Math.random() * nbNames)
    let name = this.names[n]

    delete this.names

    this.name = name
    this.species = species
    this.htmlId = uuidv4()
    world.stuff[this.htmlId] = this
  }

  remove () {
    var element = document.getElementById(this.htmlId)
    element.parentNode.removeChild(element)
    delete world.stuff[this.htmlId]
  }

  addingToHtml () {
    var animal = document.getElementById('animal').cloneNode(true)
    animal.id = this.htmlId
    animal.getElementsByTagName('img')[0].src = this.img
    animal.getElementsByClassName('name')[0].innerHTML = this.name
    animal.getElementsByClassName('species')[0].innerHTML = this.species

    animal.onclick = function () {
      toggleSelectStuff(animal.id)
    }

    stuffBlock.appendChild(animal)
  }
}

Animal.loadDef = function (json) {
  Animal.def = json
  for (let i in Animal.def) {
    let elem = document.getElementById('buy-' + i)
    addText(elem, 'cost: $ ' + Animal.def[i].cost)
  }
}

export class Demon {
  constructor (level) {
    const nd = Math.floor(Math.random() * Demon.def.length)
    const name = Demon.def[nd]
    this.name = name
    this.level = level
    this.htmlId = uuidv4()

    world.stuff[this.htmlId] = this
  }

  static loadDef (json) {
    Demon.def = json
  }

  remove () {
    var element = document.getElementById(this.htmlId)
    element.parentNode.removeChild(element)
    delete world.stuff[this.htmlId]
  }

  addingToHtml () {
    var demon = document.getElementById('demon').cloneNode(true)
    demon.id = this.htmlId
    // demon.getElementsByTagName('img')[0].src = this.img
    demon.getElementsByClassName('name')[0].innerHTML = this.name

    demon.onclick = function () {
      toggleSelectStuff(demon.id)
    }

    document.getElementById('demons').appendChild(demon)
  }
}
