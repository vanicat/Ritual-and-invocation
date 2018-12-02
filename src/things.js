/* global */
import { stuffBlock } from './main.js'
import { uuidv4 } from '../lib/misc.js'
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

function updateSelected () {
  var i, stuff, elem
  var div = document.getElementById('selected-stuff')
  div.innerHTML = ''

  for (i in world.selected) {
    stuff = world.selected[i]
    elem = document.getElementById(stuff.htmlId)
    elem = elem.cloneNode(true)
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
    var element = document.getElementById('htmlId')
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
}
