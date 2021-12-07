import jwt from "jsonwebtoken"

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN}`, { expiresIn: '20m' })
}

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.REFRESH_TOKEN}`, { expiresIn: '30d' })
}