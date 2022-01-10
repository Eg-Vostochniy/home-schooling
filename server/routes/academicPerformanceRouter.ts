import { auth } from '../middleware/auth'
import express from 'express'
import { academicPerformanceCtrl } from '../controllers/academicPerformance'
const router = express.Router()

router.post('/add_lesson_results', auth, academicPerformanceCtrl.addStudentLessonResults)
router.get('/get_academic_performances', auth, academicPerformanceCtrl.getAcademicPerformances)


export default router