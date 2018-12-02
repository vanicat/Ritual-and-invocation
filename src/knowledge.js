import { Ritual } from './ritual.js'

export var Knowledge = {
  learn (name) {
    let i = Knowledge.def.findIndex(x => x.name === name)
    let k = Knowledge.def[i]

    switch (k.type) {
      case 'ritual': {
        let r = new Ritual(name)
        r.addingToHtml()
        break
      }

      default:
        console.assert(false, 'unknow type')
        break
    }

    Knowledge.def.splice(k, 1)
  },

  loadDef (def) {
    Knowledge.def = def
  }
}
