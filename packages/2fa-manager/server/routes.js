import express from 'express'
import { SEND_WITH_PROVIDER_URL, CHECK_TOKEN_WITH_PROVIDER_URL, GET_PROVIDERS_URL } from '../isomorphic'
import TwoFAManager from './TwoFAManager'

const router = express.Router()

router.post(SEND_WITH_PROVIDER_URL, async (req, res) => {
  try {
    await TwoFAManager.send(req.body)
    res.status(200).end()
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post(CHECK_TOKEN_WITH_PROVIDER_URL, async (req, res) => {
  try {
    const { token, providerName } = req.body
    await TwoFAManager.check(token, providerName)
    res.status(200).end()
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get(GET_PROVIDERS_URL, (req, res) => {
  try {
    const providers = TwoFAManager.getProviders()
    res.status(200).send(providers)
  } catch (err) {
    res.status(400).send(err)
  }
})

export default function (expressApp) {
  expressApp.use(router)
}
