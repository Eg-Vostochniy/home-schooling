import { auth } from '../middleware/auth'
import express from 'express'
import { lessonCtrl } from '../controllers/lessonCtrl'
const router = express.Router()

router.post('/create_lesson', auth, lessonCtrl.createLesson)
router.get('/get_lessons', auth, lessonCtrl.getLessons)
router.delete('/delete_lesson', auth, lessonCtrl.deleteLesson)
router.patch('/update_lesson_status', auth, lessonCtrl.updateLessonStatus)

export default router