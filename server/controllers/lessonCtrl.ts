import { Response } from "express"
import { IReqAuth } from "../config/Interface"
import Lesson from "../models/lessonModel"

export const lessonCtrl = {
    createLesson: async (req: IReqAuth, res: Response) => {
        try {
            const {
                lessonStart,
                lessonStatus,
                lessonUser,
                lessonType,
                teacher } = req.body
            const { user } = req
            if (user) {
                const newLesson = new Lesson({
                    lessonStart, lessonStatus, lessonType, teacher, lessonUser
                })
                await newLesson.save()

                return res.json({ msg: 'Lesson created!' })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getLessons: async (req: IReqAuth, res: Response) => {
        try {
            const { user } = req
            if (user) {
                if (user.role === 'teacher') {
                    const lessons = await Lesson.find({ teacher: user._id })
                    if (!lessons) return res.status(400).json({ msg: 'Lesson not find' })

                    return res.json(lessons)
                }
                else {
                    const lessons = await Lesson.find().populate('teacher', 'avatar username fullname')
                    const userLessons = lessons.map(l => l.lessonType === 'user' ?
                        (l as any).lessonUser._id == user._id ?
                            l : null :
                        (l as any).lessonUser.groupUsers.find((gU: any) => gU == user._id) ?
                            l : null
                    )
                    return res.json(userLessons.filter(uL => uL !== null))
                }
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteLesson: async (req: IReqAuth, res: Response) => {
        try {
            const { user } = req
            if (user) {
                const lesson = await Lesson.findByIdAndDelete(req.query.id)
                if (!lesson) return res.status(400).json({ msg: 'Lesson undefined' })

                return res.json({ msg: 'Lesson deleted' })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateLessonStatus: async (req: IReqAuth, res: Response) => {
        try {
            const { user, body: { id, status } } = req
            if (user) {
                const lesson = await Lesson.findByIdAndUpdate(id, {
                    lessonStatus: status
                })
                if (!lesson) return res.status(400).json({ msg: 'Lesson undefined' })

                return res.json({
                    msg: 'Lesson status updated',
                    newStatus: {
                        ...lesson._doc,
                        status
                    }
                })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}