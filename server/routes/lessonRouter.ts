import { auth } from '../middleware/auth'
import express from 'express'
import { lessonCtrl } from '../controllers/lessonCtrl'
const router = express.Router()

router.post('/create_lesson', auth, lessonCtrl.createLesson)


export default router