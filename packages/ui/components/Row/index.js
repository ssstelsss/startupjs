import React from 'react'
import './index.styl'
import propTypes from 'prop-types'
import Div from '../Div'
import { observer } from 'startupjs'

function Row ({
  style,
  children,
  align,
  vAlign,
  wrap,
  reverse,
  ...props
}) {
  return pug`
    Div.root(
      style=style
      styleName=[align, 'v_' + vAlign, { wrap, reverse }]
      ...props
    )
      = children
  `
}

Row.propTypes = {
  style: propTypes.object,
  children: propTypes.node,
  wrap: propTypes.bool,
  reverse: propTypes.bool,
  align: propTypes.oneOf(['center', 'right', 'around', 'between']),
  vAlign: propTypes.oneOf(['center'])
}

export default observer(Row)