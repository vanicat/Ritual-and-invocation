export function uuidv4 () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0
    var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function addText (elem, t) {
  let text = document.createTextNode(t)
  elem.appendChild(text)
}

export function addBr (elem) {
  let br = document.createElement('br')
  elem.appendChild(br)
}
