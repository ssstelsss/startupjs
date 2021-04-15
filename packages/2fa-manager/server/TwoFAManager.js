// import { Provider } from '../Provider'

export default class TwoFAManager {
  constructor (options) {
    if (TwoFAManager._instance) {
      return TwoFAManager._instance
    }
    TwoFAManager._instance = this
    this.providers = options.providers || [] // [Provider1, Provider2 instanceof Provider]
  }

  providerRedirectUrl (providerName) {
    const provider = this._getProvider(providerName)
    const redirectUrl = provider.getRedirectUrl && provider.getRedirectUrl()
    if (!redirectUrl) {
      throw new Error(`[TwoFAManager.providerRedirectUrl]: Redirect url of ${provider.getName()} is missed!`)
    }
    return redirectUrl
  }

  getProviders () {
    return this.providers.map(provider => provider.getName())
  }

  initProviders (ee) {
    this.providers.forEach(provider => provider.init(ee))
  }

  _getProvider (providerName) {
    const provider = this.providers.find(provider => provider.getName() === providerName)
    if (!provider) {
      throw new Error(`[TwoFAManager._getProvider]: Provider ${provider} doesn't exist!`)
    }
    // if (!(provider instanceof Provider)) {
    //   throw new Error(`[TwoFAManager._getProvider]: Provider ${provider} must be instance of Provider from @startupjs/2fa-manager!`)
    // }

    return provider
  }
}
