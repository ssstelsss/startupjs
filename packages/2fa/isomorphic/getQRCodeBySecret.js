import * as QRCode from 'qrcode'

export default async function getQRCodeBySecret (secret) {
  const QR = await QRCode.toDataURL(secret)
  return QR
}
