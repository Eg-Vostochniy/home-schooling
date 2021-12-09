interface ICommon {
    _id: string
    createdAt: string
    updatedAt: string
}
export interface IUser extends ICommon {
    username: string
    fullname: string
    email: string
    password: string
    avatar: string
    role: string
}