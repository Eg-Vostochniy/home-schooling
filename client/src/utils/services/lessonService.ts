import axios, { AxiosResponse } from "axios"
import { ILesson, IReqLesson } from "../../models/ILesson"

type AddedLesson = {
    msg: string
    addedLesson: ILesson
}

type UpdatedLesson = {
    msg: string
    lesson: ILesson
}

export const lessonAPI = {
    createLesson: async (data: IReqLesson, token: string): Promise<AxiosResponse<AddedLesson>> => {
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
    updateLessonStatus: async (id: string, status: string, token: string): Promise<AxiosResponse<UpdatedLesson>> => {
        return await axios.patch('/api/update_lesson_status', { id, status }, {
            headers: { Authorization: token }
        })
    }
}