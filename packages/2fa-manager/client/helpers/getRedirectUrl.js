import axios from 'axios'
import { GET_PROVIDER_REDIRECT_URL } from '../../isomorphic'

export default async function getRedirectUrl (providerName) {
  try {
    const { data } = await axios.post(GET_PROVIDER_REDIRECT_URL, { providerName })
    return data
  } catch (err) {
    throw new Error(err.response.data)
  }
}
