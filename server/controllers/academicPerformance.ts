import { Response } from "express"
import { IReqAuth } from "../config/Interface"
import AcademicPerformance from "../models/academicPerformanceModel"

export const academicPerformanceCtrl = {
    addStudentLessonResults: async (req: IReqAuth, res: Response) => {
        try {
            const {
                student,
                teacher,
                lessonName,
                exercisesCount,
                exercisesDone,
                mistakes,
                inaccuracies,
                grade } = req.body
            const { user } = req
            if (user) {
                const newAcademicPerformance = new AcademicPerformance({
                    student,
                    teacher,
                    lessonName,
                    exercisesCount,
                    exercisesDone,
                    mistakes,
                    inaccuracies,
                    grade
                })

                await newAcademicPerformance.save()

                const performance = await AcademicPerformance.find()

                return res.json({
                    msg: 'Performance created',
                    performance: performance[performance.length - 1]
                })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAcademicPerformances: async (req: IReqAuth, res: Response) => {
        try {
            const { user } = req
            if (user) {
                let performances = []
                user.role === 'teacher' ?
                    performances = await AcademicPerformance.find({ teacher: user._id }) :
                    performances = await AcademicPerformance.find({ student: user._id })

                if (performances.length === 0) {
                    return res.status(400).json({ msg: 'Performances undefined' })
                }

                return res.json(performances)
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}