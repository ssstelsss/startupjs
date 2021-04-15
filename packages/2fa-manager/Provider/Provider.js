export default class Provider {
  constructor (name, init) {
    this.name = name
    this.init = init
  }

  getName () {
    return this.name
  }
}
