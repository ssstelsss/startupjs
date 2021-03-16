import { createOrUpdateSecret, checkToken, getSecret } from './helpers'
import { GET_SECRET_URL, CHECK_TOKEN_URL, CREATE_SECRET_URL } from '../isomorphic/constants'

export default function initDefaultRoutes (router, options) {
  router.get(CREATE_SECRET_URL, async function (req, res) {
    const secret = await createOrUpdateSecret(req.model, req.session, options)

    console.log('secret: ', secret)

    res.status(200).json({ secret })
  })

  router.get(GET_SECRET_URL, async function (req, res) {
    const secret = await getSecret(req.model, req.session)
    res.status(200).json(secret)
  })

  router.post(CHECK_TOKEN_URL, async function (req, res) {
    const { token } = req.body
    const isValid = await checkToken(req.model, req.session, token)
    res.status(200).json({ isValid })
  })
}
