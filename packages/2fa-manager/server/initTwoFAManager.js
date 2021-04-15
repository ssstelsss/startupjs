import routes from './routes'
import TwoFAManager from './TwoFAManager'

export default function (ee, options) {
  const TwoFAManagerInstance = new TwoFAManager(options)
  TwoFAManagerInstance.initProviders(ee)

  ee.on('routes', routes)
}
