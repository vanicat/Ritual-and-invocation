import { Ritual } from './ritual.js'

export class Knowledge {
  constructor (name) {
    Object.assign(this, Knowledge.def['name'])
  }

  learn () {
    switch (this.type) {
      case 'ritual': {
        let r = new Ritual(this.name)
        r.addingToHtml()
        break
      }

      default:
        console.assert(false, 'unknow type')
        break
    }
  }

  static loadDef (def) {
    Knowledge.def = def
  }
}
