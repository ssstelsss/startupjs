import React, { useState, useEffect } from 'react'
import { observer, emit } from 'startupjs'
import { Div, Span, Radio, Button } from '@startupjs/ui'
import PropTypes from 'prop-types'
import { getProviders, getRedirectUrl } from '../../../helpers'
import './index.styl'

function ModalContent ({
  onSuccess,
  onDismiss
}) {
  const [providers, setProviders] = useState([])
  const [selectedProvider, setSelectedProvider] = useState('')

  useEffect(() => {
    async function _getProviders () {
      const _providers = await getProviders()
      setProviders(_providers)
    }
    _getProviders()
  }, [])

  async function chooseProvider (selectedProvider) {
    const redirectUrl = await getRedirectUrl(selectedProvider)
    if (redirectUrl) {
      emit('url', redirectUrl)
    }
  }

  return pug`
    Div.root
      Div.providersBlock
        Span Choose Provider:
        Div.chooseProvider
          Radio(
            value=selectedProvider
            onChange=(value) => setSelectedProvider(value)
          )
            each provider in providers
              Radio.Item(
                key=provider
                value=provider
              )
                Span= provider
      Div.buttons
        if selectedProvider
          Button.sendCodeButton(
            onPress=() => chooseProvider(selectedProvider)
          ) Choose
  `
}

ModalContent.propTypes = {
  onSuccess: PropTypes.func,
  onDismiss: PropTypes.func
}

export default observer(ModalContent)
