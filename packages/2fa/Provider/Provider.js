export default class Provider {
  constructor (name, send) {
    this.name = name
    this.send = send
    this.window = window
  }

  send () {
    this.send()
  }

  getName () {
    return this.name
  }

  getWindow () {
    return this.window
  }
}
