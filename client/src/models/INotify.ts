import { ICommon } from "./IUser"

interface INtfUser {
    _id: string
    username: string
    fullname: string
    avatar: string
}

export interface INotify extends ICommon {
    user: INtfUser
    content: string
    title: string
    recipients: string[]
}
export interface IResNotify {
    content: string
    title: string
    recipients: string[]
}