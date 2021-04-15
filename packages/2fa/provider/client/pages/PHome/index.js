import React from 'react'
import { observer } from 'startupjs'
import { Row } from '@startupjs/ui'
import { CheckToken } from '../../../../client'
import './index.styl'

export default observer(function TestComponent ({ style }) {
  return pug`
    Row.root(align='center')
      CheckToken.checkToken(
        onSuccess=() => alert('Right code')
        onDismiss=() => alert('Wrong code')
      )
  `
})
