import { Request, Response } from "express"
import Users from "../models/userModel"

export const userCtrl = {
    getStudents: async (req: Request, res: Response) => {
        try {
            const { user }: any = req
            if (user.role !== 'teacher') return res.status(400).json({ msg: 'You are not a teacher' })

            if (!req.query.username) return res.status(400).json({ msg: 'Add query point' })
            const students = await Users.find({
                username: { $regex: req.query.username } as any,
                role: 'student'
            }).limit(10).select('avatar username fullname')

            return res.json(students)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addNewStudents: async (req: Request, res: Response) => {
        try {
            const { users } = req.body
            const { user }: any = req

            await Users.findOneAndUpdate({ _id: user._id }, {
                $push: { students: users }
            }, { new: true }
            )

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}