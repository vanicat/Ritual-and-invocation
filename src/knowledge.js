import { Ritual } from './ritual.js'

export var Knowledge = {
  learn (name) {
    let k = Knowledge.def.filter(x => x.name === name)[0]

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
  },

  loadDef (def) {
    Knowledge.def = def
  }
}
