import { init2fa } from '@startupjs/2fa/server'
import routes from './routes'
import TwoFAManager from './TwoFAManager'

export default function (ee, options) {
  init2fa(ee, options)

  ee.on('afterSession', expressApp => {
    expressApp.use((req, res, next) => {
      // eslint-disable-next-line no-new
      new TwoFAManager(req.model, req.session, options)
      next()
    })
  })

  ee.on('routes', routes)
}
