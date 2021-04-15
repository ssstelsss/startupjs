import { init } from './server'
import { TOTP_URL } from './constants'

export class Provider {
  constructor (name, init, redirectUrl) {
    this.name = name
    this.init = init
    this.redirectUrl = redirectUrl
  }

  getName () {
    return this.name
  }

  getRedirectUrl () {
    return this.redirectUrl
  }
}

export default new Provider('totp', init, TOTP_URL)
