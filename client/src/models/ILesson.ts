import { ICommon } from "./IUser"

export interface ILesson extends ICommon {
    teacher: string
    lessonUser: string
    usersType: string
    lessonStart: string
    lessonDuration: string
    lessonStatus: string
}
export interface IResLesson {
    teacher: string
    lessonUser: string
    usersType: string
    lessonStart: string
    lessonDuration: string
    lessonStatus: string
}