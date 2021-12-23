import axios from "axios"
import { IResLesson } from "../../models/ILesson"

export const lessonAPI = {
    createLesson: async (data: IResLesson, token: string) => {
        return await axios.post('/api/create_lesson', data, {
            headers: { Authorization: token }
        })
    }
}