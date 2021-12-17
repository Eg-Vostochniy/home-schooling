import axios, { AxiosResponse } from "axios"
import { IStudent } from "../../models/IUser"

export const userAPI = {
    getStudents: async (username: string, token: string): Promise<AxiosResponse<IStudent[]>> => {
        return await axios.get(`api/students?username=${username}`, {
            headers: { Authorization: token }
        })
    }
}