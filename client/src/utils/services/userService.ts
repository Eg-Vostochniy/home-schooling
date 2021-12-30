import axios, { AxiosResponse } from "axios"
import { IGroup, IResUser } from "../../models/IUser"


export const userAPI = {
    getUsers: async (username: string, token: string): Promise<AxiosResponse<IResUser[]>> => {
        return await axios.get(`api/get_users?username=${username}`, {
            headers: { Authorization: token }
        })
    },
    addNewUser: async (id: string, token: string): Promise<AxiosResponse<{ msg: string }>> => {
        return await axios.post(`/api/add_new_users`, { id }, {
            headers: { Authorization: token }
        })
    },
    deleteUser: async (id: string, token: string): Promise<AxiosResponse<{ msg: string }>> => {
        return await axios.delete(`/api/delete_user?id=${id}`, {
            headers: { Authorization: token }
        })
    },
    addNewGroup: async (data: IGroup, token: string): Promise<AxiosResponse<{ msg: string }>> => {
        return await axios.post('/api/add_new_group', { data }, {
            headers: { Authorization: token }
        })
    }
}