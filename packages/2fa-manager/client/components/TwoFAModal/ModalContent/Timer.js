import React, { useState, useEffect, useImperativeHandle } from 'react'
import { observer } from 'startupjs'
import { Div, Span } from '@startupjs/ui'
import PropTypes from 'prop-types'

function TimerComponent ({
  from,
  to,
  step,
  onFinish
}, ref) {
  const [timer, setTimer] = useState(from)
  const [timerId, setTimerId] = useState('')
  const [isRestart, setIsRestart] = useState(false)

  useImperativeHandle(ref, () => ({
    restart: () => {
      setTimer(from)
      setIsRestart(value => !value)
    }
  }), [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(timer => timer - step)
    }, 1000)
    setTimerId(intervalId)
    return () => {
      clearInterval(intervalId)
    }
  }, [isRestart])

  useEffect(() => {
    if (timer <= to) {
      clearInterval(timerId)
      onFinish && onFinish()
    }
  }, [timer])

  return pug`
    Div
      Span= timer
  `
}

const Timer = observer(TimerComponent, { forwardRef: true })

Timer.defaultProps = {
  from: 30,
  to: 0,
  step: 1
}

Timer.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  step: PropTypes.number,
  onFinish: PropTypes.func
}

export default Timer
