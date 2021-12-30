export interface IResLesson {
    teacher: ITeacher
    lessonUser: any
    lessonType: string
    lessonStart: string
    lessonStatus: string
}
export interface IReqLesson {
    teacher: string
    lessonUser: any
    lessonType: string
    lessonStart: string
    lessonStatus: string
}
export interface ILesson extends IResLesson {
    _id: string
}
export interface ITeacher {
    _id: string
    avatar: String
    username: String
    fullname: string
}
