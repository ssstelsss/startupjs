import React, { useState, useEffect } from 'react'
import { observer } from 'startupjs'
import { Div, TextInput, Span } from '@startupjs/ui'
import PropTypes from 'prop-types'
import { getProviders } from '../../helpers'
import './index.styl'

function ModalContent () {
  const [providers, setProviders] = useState([])
  const [token, setToken] = useState('')

  useEffect(() => {
    async function _getProviders () {
      const _providers = await getProviders()
      setProviders(_providers)
    }
    _getProviders()
  }, [])
  return pug`
    Div.root
      TextInput(
        value=token
        onChange=setToken
      )
      each provider in providers
        Span= provider
  `
}

ModalContent.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  onSuccess: PropTypes.func,
  onDismiss: PropTypes.func
}

export default observer(ModalContent)
