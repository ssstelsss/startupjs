export default class Provider {
  constructor (name, send, window = 1) {
    this.name = name
    this.send = send
    this.window = window
  }

  async send (token) {
    await this.send(token)
  }

  getName () {
    return this.name
  }

  getWindow () {
    return this.window
  }
}
