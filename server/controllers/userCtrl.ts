import { IReqAuth } from './../config/Interface'
import { Response } from "express"
import Users from "../models/userModel"
import Lessons from "../models/lessonModel"

export const userCtrl = {
    getUsers: async (req: IReqAuth, res: Response) => {
        try {
            const { user } = req
            if (user) {
                if (!req.query.username) return res.status(400).json({ msg: 'Add query point' })

                if (user.role === 'teacher') {
                    const users = await Users.find({
                        username: { $regex: req.query.username } as any,
                        role: 'student'
                    }).limit(10).select('avatar username fullname')
                    return res.json(users)
                }

                if (user.role === 'student') {
                    const users = await Users.find({
                        username: { $regex: req.query.username } as any,
                        role: 'teacher'
                    }).limit(10).select('avatar username fullname')
                    return res.json(users)
                }
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addNewUsers: async (req: IReqAuth, res: Response) => {
        try {
            const { user } = req
            if (user) {
                if (user.roleUsers.length > 0 &&
                    user.roleUsers.find(role => role === req.body.id)
                )
                    return res.status(300).json({
                        msg: 'User already added'
                    })

                const authUser = await Users.findOneAndUpdate({ _id: user._id }, {
                    $push: { roleUsers: req.body.id }
                }, { new: true })

                await Users.findOneAndUpdate({ _id: req.body.id }, {
                    $push: { roleUsers: user._id }
                }, { new: true })

                return res.json({msg: 'User added'})
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req: IReqAuth, res: Response) => {
        try {
            const { id } = req.query
            const { user } = req
            if (user) {
                const usrAuth = await Users.findById(user._id)
                if (usrAuth?.roleUsers.length === 0)
                    return res.status(400).json({ msg: 'User does not exist' })

                const roleUser = await Users.findById(id)
                if (roleUser?.roleUsers.length === 0)
                    return res.status(400).json({ msg: 'User does not exist' })

                await usrAuth?.update({ $pull: { roleUsers: id } })
                await roleUser?.update({ $pull: { roleUsers: user._id } })

                if (user.role === 'student') {
                    await Lessons.deleteMany({
                        teacher: (id as any),
                        lessonType: 'user',
                        lessonUser: { _id: user._id }
                    })
                    const less = await Lessons.find({ teacher: (id as any) })
                    await less?.forEach(l => {
                        l.update({ $pull: { groupUsers: id } })
                    })
                }
                if (user.role === 'teacher') {
                    await Lessons.deleteMany({
                        teacher: user._id,
                        lessonType: 'user',
                        lessonUser: { _id: id }
                    })
                    const less = await Lessons.find({ teacher: user._id })
                    await less?.forEach(l => {
                        l.update({ $pull: { groupUsers: id } })
                    })
                }

                return res.json({ msg: 'User deleted' })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addNewGroup: async (req: IReqAuth, res: Response) => {
        try {
            const { data } = req.body
            const { user } = req

            if (user) {
                data.groupUsers.forEach(async (userId: any) => {
                    await Users.findByIdAndUpdate(userId, {
                        $push: { groupAddedUsers: data }
                    })
                })
                return res.json({ msg: 'Group added' })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateAuthedUser: async (req: IReqAuth, res: Response) => {
        try {
            const { username, fullname, avatar } = req.body
            const { user } = req

            if (user) {
                const User = await Users.findByIdAndUpdate(user._id, {
                    username, fullname, avatar
                })
                if (!User) return res.status(400).json({ msg: 'Update error' })

                return res.json({ msg: 'Update success' })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
}