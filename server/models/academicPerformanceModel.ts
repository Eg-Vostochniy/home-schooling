import mongoose from 'mongoose'

const academicPerformanceSchema = new mongoose.Schema({
    student: String,
    teacher: String,
    lessonName: String,
    exercisesCount: Number,
    exercisesDone: Number,
    mistakes: Number,
    inaccuracies: Number,
    grade: Number
}, {
    timestamps: true
})

export default mongoose.model('academicPerformance', academicPerformanceSchema)