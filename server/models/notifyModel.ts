import mongoose from 'mongoose'
import { INotify } from '../config/Interface'

const notifySchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    recipients: [mongoose.Types.ObjectId],
    title: String,
    content: String
}, {
    timestamps: true
})

export default mongoose.model<INotify>('notify', notifySchema)