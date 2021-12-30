import { IUser } from "./IUser";

export interface ILoginData {
    email: string
    password: string
}

export interface IRegistData {
    username: string
    fullname: string
    email: string
    password: string
    cf_password: string
    role: string
}

export interface IAuth {
    msg: string
    user: IUser
    token: string
}
export interface IEditProfile {
    username: string
    fullname: string
    avatar: string
}