import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'startupjs'
import { Div, TextInput, Span, Radio, Button } from '@startupjs/ui'
import PropTypes from 'prop-types'
import { getProviders, sendToken, checkToken } from '../../../helpers'
import Timer from './Timer'
import './index.styl'

function ModalContent ({
  onSuccess,
  onDismiss
}) {
  const timerRef = useRef()

  const [providers, setProviders] = useState([])
  const [token, setToken] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [isCodeSend, setIsCodeSend] = useState(false)
  const [isTimerFinished, setIsTimerFinished] = useState(true)

  useEffect(() => {
    async function _getProviders () {
      const _providers = await getProviders()
      setProviders(_providers)
    }
    _getProviders()
  }, [])

  async function _checkToken () {
    const isValid = await checkToken(token, selectedProvider)
    if (isValid) {
      onSuccess && onSuccess()
    } else {
      onDismiss && onDismiss()
    }
  }

  function _sendToken (selectedProvider) {
    sendToken(selectedProvider)
    timerRef.current?.restart()
    setIsTimerFinished(false)
    setIsCodeSend(true)
  }

  return pug`
    Div.root
      Div.inputBlock
        TextInput(
          value=token
          editable=selectedProvider && isCodeSend
          onChangeText=setToken
        )
      Div.providersBlock
        Span Choose Provider:
        Div.chooseProvider
          Radio(
            value=selectedProvider
            disabled=!isTimerFinished
            onChange=(value) => setSelectedProvider(value)
          )
            each provider in providers
              Radio.Item(
                key=provider
                disabled=isCodeSend
                value=provider
              )
                Span= provider
      Div.buttons
        if selectedProvider
          Button.sendCodeButton(disabled=!selectedProvider || !isTimerFinished onPress=() => _sendToken(selectedProvider))
            if (isCodeSend)
              Span
                Span You can send another code after 
                Timer(
                  ref=timerRef
                  onFinish=() => setIsTimerFinished(true)
                )
            else
              Span Send code
        if isCodeSend
          Button.checkCodeButton(disabled=!token && !isCodeSend onPress=() => _checkToken(token)) Check Code
  `
}

ModalContent.propTypes = {
  onSuccess: PropTypes.func,
  onDismiss: PropTypes.func
}

export default observer(ModalContent)
