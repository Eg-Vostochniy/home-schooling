import { Request } from "express"
import { Document } from "mongoose"

export interface IUser extends Document {
    username: string
    fullname: string
    email: string
    avatar: string
    password: string
    role: 'teacher' | 'student'
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
    role: 'teacher' | 'student'
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