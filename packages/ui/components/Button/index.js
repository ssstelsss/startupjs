import React from 'react'
import Icon from '../Icon'
import { Text } from 'react-native'
import Div from '../Div'
import Row from '../Row'
import { observer } from 'startupjs'
import PropTypes from 'prop-types'
import './index.styl'

const Button = observer(({
  style,
  children,
  variant, // shadowed, outlined, ghost
  size, // large, big
  squared,
  disabled,
  onPress,
  icon,
  iconType,
  iconSize,
  iconColor,
  ...props
}) => {
  return pug`
    Div.root(
      shadow=variant==='shadowed' && 'm'
      onPress=disabled ? undefined : onPress
      activeOpacity=1
      styleName=[variant, size, {
        squared,
        icon,
        disabled
      }]
      style=style
      ...props
    )
      Row(align='center' vAlign='center')
        if icon
          Div.icon(style={width: 25, height: 25, backgroundColor: '#ffae00'})
        if children
          Text.text= children
  `
})

Button.defaultProps = {
  variant: 'flat',
  size: 'normal'
}

Button.propType = {
  variant: PropTypes.oneOf(['flat', 'shadowed', 'outlined', 'ghost']),
  size: PropTypes.oneOf(['normal', 'large', 'big']),
  squared: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconType: PropTypes.string,
  iconSize: PropTypes.oneOf('xs', 's', 'm', 'l', 'xl', 'xxl'),
  iconColor: PropTypes.string
}

export default Button
