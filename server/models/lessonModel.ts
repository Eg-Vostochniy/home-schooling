import mongoose from 'mongoose'
import { ILesson } from '../config/Interface'

const lessonSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    lessonUser: Object,
    lessonType: String,
    lessonStart: String,
    lessonStatus: String
})

export default mongoose.model<ILesson>('lesson', lessonSchema)