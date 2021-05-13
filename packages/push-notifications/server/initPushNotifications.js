import express from 'express'
import initDefaultRoutes from './initDefaultRoutes'

const router = express.Router()

export default function initPushNotifications (ee, options) {
  initDefaultRoutes(router, options)
  ee.on('routes', expressApp => {
    expressApp.use(router)
  })
}
