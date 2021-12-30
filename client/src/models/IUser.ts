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
export interface IGroup {
    groupName: string
    groupUsers: string[]
}
export interface IResGroup extends IGroup {
    _id: string
}
export interface IResNewUser {
    user: IResUser
    msg: string
}

