import { getToken, checkToken } from '@startupjs/2fa/server/helpers'

// Генерировать секрет при инициализации или нет? Если да, то в какой момент ( у нас на момент запуска сервера еще нет авторизованного пользователя)
// по идеи этого пакета должно быть достаточно для работы, тогда он должен уметь генерировать секрет

// Если я собираюсь юзать изоморфно пакет, какую сессию мне стоит использовать????

// минус клиентской сессии: айди юзера могут подменить на клиенте
// если заюзаю изоморфно, серверная сессия утечет

// !!!!!!! Может просто сделать сессию аргументом???

// ++++++++++++++++
// может зарегистрировать роут на который будет лететь имя провайдера, а класс уже на сервере чисто будет отрабатывать
export default class TwoFAManager {
  constructor (model, session, providers) {
    if (TwoFAManager._instance) {
      return TwoFAManager._instance
    }
    TwoFAManager._instance = this
    this.model = model
    this.session = session
    this.providers = providers // [{ name: 'Email', ... }, { name: 'Push', ... }]
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
