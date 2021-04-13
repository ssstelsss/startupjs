import axios from 'axios'
import { CHECK_TOKEN_WITH_PROVIDER_URL } from '../../isomorphic'

export default async function checkToken (token, providerName) {
  try {
    const { data } = await axios.post(CHECK_TOKEN_WITH_PROVIDER_URL, { token, providerName })
    return data
  } catch (err) {
    throw new Error(err.response.data)
  }
}
