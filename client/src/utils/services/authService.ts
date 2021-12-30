import axios, { AxiosResponse } from 'axios'
import { IAuth, IEditProfile, ILoginData, IRegistData } from '../../models/IAuth'

export const authAPI = {
    login: async (data: ILoginData): Promise<AxiosResponse<IAuth>> => {
        return await axios.post('/api/login', data)
    },
    register: async (data: IRegistData): Promise<AxiosResponse<IAuth>> => {
        return await axios.post('/api/register', data)
    },
    logout: async (): Promise<AxiosResponse<{ msg: string }>> => {
        return await axios.get('/api/logout')
    },
    refresh_token: async (): Promise<AxiosResponse<IAuth>> => {
        return await axios.get('/api/refresh_token')
    },
    updateAuthedUser: async (data: IEditProfile, token: string): Promise<AxiosResponse<{ msg: string }>> => {
        return await axios.patch('/api/update_authed_user', data, {
            headers: { Authorization: token }
        })
    }
}
