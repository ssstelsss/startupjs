import React from 'react'
import { observer } from 'startupjs'
import { Modal } from '@startupjs/ui'
import PropTypes from 'prop-types'
import ModalContent from './ModalContent'

function TwoFAModal ({
  contentProps,
  ...props
}) {
  return pug`
    Modal(
      ...props
    )
      ModalContent(...contentProps)
  `
}

TwoFAModal.propTypes = {
  $visible: PropTypes.object
}

export default observer(TwoFAModal)
