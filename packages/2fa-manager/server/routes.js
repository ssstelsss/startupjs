import express from 'express'
import { GET_PROVIDER_REDIRECT_URL, GET_PROVIDERS_URL } from '../isomorphic'
import TwoFAManager from './TwoFAManager'

const router = express.Router()

router.post(GET_PROVIDER_REDIRECT_URL, async (req, res) => {
  try {
    const redirectUrl = new TwoFAManager().providerRedirectUrl(req.body.providerName)
    res.status(200).send(redirectUrl)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get(GET_PROVIDERS_URL, (req, res) => {
  try {
    const providers = new TwoFAManager().getProviders()
    res.status(200).send(providers)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

export default function (expressApp) {
  expressApp.use(router)
}
