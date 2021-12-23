import axios from 'axios'
import { AxiosResponse } from 'axios'
import { INotify, IResNotify } from "../../models/INotify"

export const notifyAPI = {
    getNotifies: async (token: string): Promise<AxiosResponse<INotify[]>> => {
        return axios.get('/api/get_notifies', {
            headers: { Authorization: token }
        })
    },
    createNotify: async (msg: IResNotify, token: string): Promise<AxiosResponse<INotify[]>> => {
        return axios.post('/api/create_notify', msg, {
            headers: { Authorization: token }
        })
    },
    deleteNotify: async (id: string, token: string): Promise<AxiosResponse> => {
        return axios.delete(`/api/delete_notify?id=${id}`, {
            headers: { Authorization: token }
        })
    }
}