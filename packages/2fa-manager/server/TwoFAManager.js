import { getToken, checkToken } from '@startupjs/2fa/server/helpers'
import { Provider } from '@startupjs/2fa/Provider'

export default class TwoFAManager {
  constructor (model, session, options) {
    if (TwoFAManager._instance) {
      return TwoFAManager._instance
    }
    TwoFAManager._instance = this
    this.model = model
    this.session = session
    this.appName = options.appName
    this.providers = options.providers || [] // [Provider1, Provider2 instanceof Provider]
  }

  async send (providerName) {
    const provider = this._getProvider(providerName)
    const token = await this._generateToken()
    try {
      provider.send(token)
    } catch (err) {
      throw new Error(`[TwoFAManager.send]: ${err}`)
    }
  }

  async check (token, providerName) {
    const provider = providerName && this._getProvider(providerName)
    const providerWindow = provider?.getWindow() || 1
    return this._isValidToken(token, providerWindow)
  }

  getProviders () {
    return this.providers.map(provider => provider.getName())
  }

  async _generateToken () {
    try {
      const token = await getToken(this.model, this.session)
      return token
    } catch (err) {
      throw new Error(`[TwoFAManager._generateToken]: Token can't be generated! ${err}`)
    }
  }

  _getProvider (providerName) {
    const provider = this.providers.find(provider => provider.getName() === providerName)
    if (!provider) {
      throw new Error(`[TwoFAManager._getProvider]: Provider ${provider} doesn't exist!`)
    }
    if (!(provider instanceof Provider)) {
      throw new Error(`[TwoFAManager._getProvider]: Provider ${provider} must be instance of Provider from @startupjs/2fa!`)
    }

    return provider
  }

  async _isValidToken (token, window) {
    try {
      const isValid = await checkToken(this.model, this.session, token, window)
      return isValid
    } catch (err) {
      throw new Error(`[TwoFAManager._isValidToken]: ${err}`)
    }
  }
}
