import { userCtrl } from './../controllers/userCtrl';
import express from 'express'
import { auth } from '../middleware/auth'
const router = express.Router()

router.get('/get_users', auth, userCtrl.getUsers)
router.post('/add_new_users', auth, userCtrl.addNewUsers)
router.delete('/delete_user', auth, userCtrl.deleteUser)
router.post('/add_new_group', auth, userCtrl.addNewGroup)
router.patch('/update_authed_user', auth, userCtrl.updateAuthedUser)

export default router