import React from 'react'
import { observer } from 'startupjs'
import { Div, Layout } from '@startupjs/ui'
import './index.styl'

export default observer(function LayoutComponent ({ children }) {
  return pug`
    Layout
      Div.body= children
  `
})
