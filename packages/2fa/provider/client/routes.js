import { TOTP_URL } from '../constants'

export default (components = {}) => [
  {
    path: TOTP_URL,
    exact: true,
    component: components.PHome
  }
]
