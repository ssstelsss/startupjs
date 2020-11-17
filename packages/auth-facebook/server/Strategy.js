import passport from 'passport'
import { Strategy } from 'passport-facebook'
import Provider from './Provider'
import initRoutes from './initRoutes'
import { CALLBACK_URL, FIELDS } from '../isomorphic/constants'

function validateConfigs ({ clientId, clientSecret }) {
  if (!clientId) {
    throw new Error('[@dmapper/auth-facebook] Error:', 'Provide Client Id')
  }
  if (!clientSecret) {
    throw new Error('[@dmapper/auth-facebook] Error:', 'Provide Client Secret')
  }
}

export default function (config = {}) {
  this.config = {}

  return ({ model, router, updateClientSession, authConfig }) => {
    Object.assign(this.config, {
      ...authConfig
      // Any defaults....
    }, config)

    validateConfigs(this.config)

    const { clientId, clientSecret } = this.config

    initRoutes({ router, config })

    // Append required configs to client session
    updateClientSession({ facebook: { clientId } })

    console.log('++++++++++ Initialization of Facebook auth strategy ++++++++++')

    passport.use(
      new Strategy(
        {
          clientID: clientId,
          clientSecret,
          callbackURL: CALLBACK_URL,
          profileFields: FIELDS
        },
        async function (accessToken, refreshToken, profile, cb) {
          let userId, err

          try {
            const provider = new Provider(model, profile, this.config)
            userId = await provider.findOrCreateUser()
          } catch (e) {
            err = e
          }

          return cb(err, userId)
        }
      )
    )
  }
}