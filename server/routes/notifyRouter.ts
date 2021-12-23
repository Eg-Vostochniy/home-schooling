import express from 'express'
import { notifyCtrl } from '../controllers/notifyCtrl'
import { auth } from '../middleware/auth'
const router = express.Router()

router.post('/create_notify', auth, notifyCtrl.createNotify)
router.get('/get_notifies', auth, notifyCtrl.getNotifies)
router.delete('/delete_notify', auth, notifyCtrl.deleteNotify)

export default router