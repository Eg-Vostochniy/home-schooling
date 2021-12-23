import { Response } from "express"
import { IReqAuth } from "../config/Interface"
import Lesson from "../models/lessonModel"
import User from "../models/userModel"

export const lessonCtrl = {
    createLesson: async (req: IReqAuth, res: Response) => {
        try {
            const {
                lessonStart,
                lessonDuration,
                lessonStatus,
                lessonUser,
                usersType,
                teacher } = req.body
            const { user } = req
            if (user) {
                const newLesson = new Lesson({
                    lessonStart, lessonDuration, lessonStatus, usersType, teacher, lessonUser
                })
                await newLesson.save()

                return res.json({ msg: 'Good' })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getLessons: async (req: IReqAuth, res: Response) => {
        try {
            const { user } = req
            if (user) {
                const lessons = await Lesson.find({ teacher: user._id })
                if (!lessons) return res.status(400).json({ msg: 'Lesson not find' })

                return res.json(lessons)
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}