import { ICommon } from './IUser'

export interface IAcademicPerformance extends ICommon {
    student: string
    teacher: string
    lessonName: string
    exercisesCount: number
    exercisesDone: number
    mistakes: number
    inaccuracies: number
    grade: number
}
export interface IResAcademicPerformance {
    student: string
    teacher: string
    lessonName: string
    exercisesCount: number
    exercisesDone: number
    mistakes: number
    inaccuracies: number
    grade: number
}