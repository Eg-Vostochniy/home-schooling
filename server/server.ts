import dotenv from 'dotenv'
dotenv.config()

import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { routes } from './routes/index'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(urlencoded())

app.use('/api', routes.authRouter)

require('./config/database')

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})
