import express from 'express'
import { authCtrl } from '../controllers/authCtrl'
import { valid } from '../middleware/valid'

const router = express.Router()

router.post('/register', valid.register, authCtrl.register)
router.post('/login', valid.login, authCtrl.login)

router.get('/logout', authCtrl.logout)
router.get('/refresh_token', authCtrl.refreshAccessToken)

export default router