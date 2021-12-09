import { Request, Response } from "express"
import { ILogUser, IRegUser } from "../config/Interface"
import User from "../models/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from "../config/generateToken"

export const authCtrl = {
    register: async (req: Request, res: Response) => {
        try {
            const { username, fullname, email, password, cf_password, role }: IRegUser = req.body

            const user_name = await User.findOne({ username })
            if (user_name) return res.status(400).json({ msg: 'This user name already exist' })

            if (password !== cf_password) return res.status(400).json({ msg: 'Passwords missmatch' })

            const user_email = await User.findOne({ email })
            if (user_email) return res.status(400).json({ msg: 'This email already exist' })

            const hash_pass = await bcrypt.hash(password, 12)

            const newUser = new User({
                username,
                fullname,
                email,
                role,
                password: hash_pass
            })

            const access_token = generateAccessToken({ id: newUser._id })
            const refresh_token = generateRefreshToken({ id: newUser._id })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            await newUser.save()

            res.json({
                msg: 'Register success',
                token: access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password }: ILogUser = req.body

            const user = await User.findOne({ email })
            if (!user) return res.status(400).json({ msg: 'Data is incorrect' })

            const isMath = await bcrypt.compare(password, user.password)
            if (!isMath) return res.status(400).json({ msg: 'Data is incorrect' })

            const access_token = generateAccessToken({ id: user._id })
            const refresh_token = generateRefreshToken({ id: user._id })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            res.json({
                msg: 'Login success',
                token: access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('refresh_token', { path: '/api/refresh_token' })
            return res.json({ msg: 'Logout success' })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    refreshAccessToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refresh_token
            if (!rf_token) return res.status(400).json({ msg: 'Please login' })

            jwt.verify(rf_token, `${process.env.REFRESH_TOKEN}`, async (err: any, result: any) => {
                if (err) return res.status(400).json({ msg: 'Please login' })

                const user = await User.findById(result.id).select('-password')
                if (!user) return res.status(400).json({ msg: 'User undefined' })

                const token = generateAccessToken({ id: user.id })

                res.json({
                    msg: 'Login success',
                    token,
                    user
                })
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}