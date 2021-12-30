import axios, { AxiosResponse } from "axios"
import { ILesson, IReqLesson } from "../../models/ILesson"

export const lessonAPI = {
    createLesson: async (data: ILesson, token: string): Promise<AxiosResponse<{ msg: string }>> => {
        return await axios.post('/api/create_lesson', data, {
            headers: { Authorization: token }
        })
    },
    getLessons: async (token: string): Promise<AxiosResponse<ILesson[]>> => {
        return await axios.get('/api/get_lessons', {
            headers: { Authorization: token }
        })
    },
    deleteLesson: async (id: string, token: string): Promise<AxiosResponse<{ msg: string }>> => {
        return await axios.delete(`/api/delete_lesson?id=${id}`, {
            headers: { Authorization: token }
        })
    },
    updateLessonStatus: async (id: string, status: string, token: string) => {
        return await axios.patch('/api/update_lesson_status', { id, status }, {
            headers: { Authorization: token }
        })
    }
}