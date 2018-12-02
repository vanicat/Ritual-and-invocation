/* global */
import { stuffBlock } from './main.js'
import { uuidv4 } from '../lib/misc.js'

var stuffList = {}

export function getStuffById (htmlId) {
  return stuffList[htmlId]
}

var selected = []

function toggleSelectStuff (htmlId) {
  var stuff = getStuffById(htmlId)
  var i = selected.indexOf(stuff)
  if (i === -1) {
    selected.push(stuff)
  } else {
    selected.splice(i, 1)
  }
  updateSelected()
}

function updateSelected () {
  var i, stuff, elem
  var div = document.getElementById('selected-stuff')
  div.innerHTML = ''

  for (i in selected) {
    stuff = selected[i]
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
