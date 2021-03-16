import * as speakeasy from 'speakeasy'
import { getQRCodeBySecret } from '../../isomorphic'

export async function createOrUpdateSecret (model, session, options) {
  const secretCode = speakeasy.generateSecret({
    name: options.APP_NAME
  })

  const secretObj = {
    otpauthUrl: secretCode.otpauth_url,
    base32: secretCode.base32
  }

  // write secret in dbs
  const userId = session.userId

  const $2fa = model.scope('2fa')
  await $2fa.subscribe()
  if ($2fa.get()) {
    $2fa.setEach({
      id: userId,
      ...secretObj
    })
  } else {
    $2fa.add({
      id: userId,
      ...secretObj
    })
  }

  // create QR
  const QRDataURL = await getQRCodeBySecret(secretCode.otpauth_url)

  return {
    ...secretObj,
    QRDataURL
  }
}

export async function checkToken (model, session, token) {
  // get code
  const userId = session.userId

  const $2fa = model.scope(`2fa.${userId}`)
  await $2fa.subscribe()
  const secret = $2fa.get('base32')

  $2fa.unsubscribe()

  // const secret = 'CODE_FROM_BD'

  // may be response with error if no secret
  if (!secret) return false

  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token
  })
}

export async function getSecret (model, session) {
  const userId = session.userId

  const $2fa = model.scope(`2fa.${userId}`)
  await $2fa.subscribe()
  const secret = $2fa.get()

  const QRDataURL = await getQRCodeBySecret(secret.otpauth_url)

  $2fa.unsubscribe()

  return {
    ...secret,
    QRDataURL
  }
}
