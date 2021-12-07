import mongoose from "mongoose"
import { IUser } from "../config/Interface"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Add your user name'],
        maxlength: [15, 'Your user name is up to 15 chars long']
    },
    fullname: {
        type: String,
        required: [true, 'Add your full name'],
        maxlength: [20, 'Your full name is up to 15 chars long'],
    },
    email: {
        type: String,
        required: [true, 'Add your e-mail']
    },
    avatar: {
        type: String,
        default: 'https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar.png'
    },
    password: {
        type: String,
        required: [true, 'Add your password'],
        minlength: [6, 'Password must be at least 6 chars']
    },
    role: {
        type: String,
        default: 'teacher'
    }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('user', userSchema)