import React from 'react'
import { initAuthApp } from '@startupjs/auth'
import {
  LoginForm,
  RegisterForm,
  RecoverForm
} from '@startupjs/auth-local'
import { H5, Div } from '@startupjs/ui'
import { AuthButton as AppleAuthButton } from '@startupjs/auth-apple'
import { AuthButton as AzureadAuthButton } from '@startupjs/auth-azuread'
import { AuthButton as FacebookAuthButton } from '@startupjs/auth-facebook'
import { AuthButton as GoogleAuthButton } from '@startupjs/auth-google'
import { AuthButton as LinkedinAuthButton } from '@startupjs/auth-linkedin'
import { AuthButton as CommonAuthButton } from '@startupjs/auth-common'
import { AuthButton as IDGAuthButton } from '@startupjs/auth-idg'
import { BASE_URL } from '@env'
import Joi from '@hapi/joi'
import Layout from './Layout'

function getCaptionForm (slide) {
  if (slide === 'sign-in') return 'Авторизация'
  if (slide === 'sign-up') return 'Регистрация'
}

const loginForm = pug`
  LoginForm(
    properties={
      email: {
        initValue: 'test@gmail.com'
      }
    }
  )
`

const registerForm = pug`
  RegisterForm(
    properties={
      name: null,
      age: {
        input: 'number',
        label: 'Age',
        placeholder: 'Enter your age'
      }
    }
    validateSchema={
      name: null,
      age: Joi.number().required().messages({
        'any.required': 'Fill in the field',
        'string.empty': 'Fill in the field'
      })
    }
  )
`

export default initAuthApp({
  Layout,
  redirectUrl: '/profile?customParam=dummy',
  localForms: {
    'sign-in': loginForm,
    'sign-up': registerForm,
    recover: <RecoverForm />
  },

  socialButtons: [
    <AppleAuthButton key='apple-btn' />,
    <AzureadAuthButton key='azure-btn' />,
    <FacebookAuthButton key='fb-btn' />,
    <GoogleAuthButton key='google-btn' />,
    <LinkedinAuthButton key='linkedin-btn' />,
    <CommonAuthButton
      key='virign-btn'
      label='Virgin'
      providerName='virgin'
      style={{ backgroundColor: '#e1090d' }}
      imageUrl={BASE_URL + '/img/virgin.png'}
    />,
    <IDGAuthButton key='idg-btn' />
  ],

  renderForm: function ({
    slide,
    socialButtons,
    localActiveForm,
    onChangeSlide
  }) {
    return pug`
      Div(style={
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 24,
        paddingRight: 24
      })
        H5(style={
          textAlign: 'center'
        })= getCaptionForm(slide)
        = socialButtons
        Div(style={ marginTop: 16 })
          = localActiveForm
    `
  }
})