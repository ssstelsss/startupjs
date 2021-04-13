import axios from 'axios'
import { SEND_WITH_PROVIDER_URL } from '../../isomorphic'

export default async function sendToken (providerName) {
  try {
    const { data } = await axios.post(SEND_WITH_PROVIDER_URL, providerName)
    return data
  } catch (err) {
    throw new Error(err.response.data)
  }
}
