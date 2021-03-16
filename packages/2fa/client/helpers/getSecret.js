import axios from 'axios'
import { GET_SECRET_URL } from '../../isomorphic'

export default async function getSecret (token) {
  const secret = await axios.get(GET_SECRET_URL)
  return secret.data
}
