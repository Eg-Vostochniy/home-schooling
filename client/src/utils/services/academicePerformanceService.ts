import { IAcademicPerformance, IResAcademicPerformance } from './../../models/IAcademicPerformance'
import axios, { AxiosResponse } from 'axios'

type AddedLessonsRes = {
    msg: string
    performance: IAcademicPerformance
}

export const academicPerformanceAPI = {
    getPerformances: (token: string): Promise<AxiosResponse<IAcademicPerformance[]>> => {
        return axios.get('/api/get_academic_performances', {
            headers: { Authorization: token }
        })
    },
    addLessonResults: (
        results: IResAcademicPerformance,
        token: string): Promise<AxiosResponse<AddedLessonsRes>> => {
        return axios.post('/api/add_lesson_results', results, {
            headers: { Authorization: token }
        })
    }
}