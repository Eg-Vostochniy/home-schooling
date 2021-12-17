import { userCtrl } from './../controllers/userCtrl';
import express from 'express'
import { auth } from '../middleware/auth'
const router = express.Router()

router.get('/students', auth, userCtrl.getStudents)
router.post('/add_new_students', auth, userCtrl.addNewStudents)

export default router