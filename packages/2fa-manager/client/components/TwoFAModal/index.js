import React from 'react'
import { observer } from 'startupjs'
import { Modal } from '@startupjs/ui'
import PropTypes from 'prop-types'
import ModalContent from './ModalContent'
import './index.styl'

function TwoFAModal ({
  $visible,
  ...props
}) {
  return pug`
    Modal(
      $visible=$visible
      ...props
    )
      ModalContent
  `
}

TwoFAModal.propTypes = {
  $visible: PropTypes.object
}

export default observer(TwoFAModal)
