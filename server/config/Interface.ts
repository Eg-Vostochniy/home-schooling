import { Request } from "express"
import { Document } from "mongoose"

export interface IUser extends Document {
    username: string
    fullname: string
    email: string
    avatar: string
    password: string
    roleUsers: string[]
    groupUsers: string[]
    role: string
    _doc: object
}
export interface INewUser {
    email: string
    password: string
}
export interface IRegUser {
    username: string
    fullname: string
    email: string
    password: string
    cf_password: string
    role: string
}
export interface ILogUser {
    email: string
    password: string
}
export interface IDecodedToken {
    id?: string
    newUser?: INewUser
    iat: number
    exp: number
}
export interface IReqAuth extends Request {
    user?: IUser
}
export interface INotify {
    _id: string
    user: { type: string, ref: string }
    recipients: string[]
    title: string
    content: string
}
export interface ILesson {
    _id: string
    teacher: string
    lessonUser: string
    usersType: string
    lessonStart: string
    lessonDuration: string
    lessonStatus: string
}