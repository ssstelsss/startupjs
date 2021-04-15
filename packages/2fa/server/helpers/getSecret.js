import * as QRCode from 'qrcode'

export default async function getSecret (model, session) {
  const userId = session.userId

  const $auths = model.scope(`auths.${userId}`)
  await $auths.subscribe()
  const secret = $auths.get('providers.2fa')

  $auths.unsubscribe()

  if (!secret) throw new Error('[@startupjs/2fa]: Two factor authentication has not connected!')

  const QRDataURL = await QRCode.toDataURL(secret.otpauthUrl)

  return {
    base32: secret.base32,
    QRDataURL
  }
}
