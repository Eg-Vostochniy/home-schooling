import mongoose from 'mongoose'
import { ILesson } from '../config/Interface'

const lessonSchema = new mongoose.Schema({
    teacher: String,
    lessonUser: mongoose.Types.ObjectId,
    usersType: String,
    lessonStart: String,
    lessonDuration: String,
    lessonStatus: String
}, {
    timestamps: true
})

export default mongoose.model<ILesson>('lesson', lessonSchema)