export interface ICommon {
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
    roleUsers: IResUser[]
    groupAddedUsers: IResGroup[]
}
export interface IResUser {
    _id: string
    avatar: string
    username: string
    fullname: string
}
export interface IResGroup {
    _id: string
    groupName: string
    groupUsers: IResUser[]
}
export interface IResNewUser {
    user: IResUser
    msg: string
}

