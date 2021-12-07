import { NextFunction, Request, Response } from "express"

export const valid = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let errs: string[] = []
            const { username, fullname, email, password } = req.body

            if (!username) errs = [...errs, 'Add your user name']
            else if (username.length > 15) errs = [...errs, 'Your user name is up to 15 chars long']

            if (!fullname) errs = [...errs, 'Add your full name']
            else if (fullname.length > 20) errs = [...errs, 'Your full name is up to 15 chars long']

            if (!email) errs = [...errs, 'Add your e-mail']
            else if (!validateEmail(email)) errs = [...errs, 'Invalid e-mail']

            if (password.length < 6) errs = [...errs, 'Password must be at least 6 chars']

            if (errs.length > 0) return res.status(400).json({ msg: errs })

            next()
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let errs: string[] = []
            const { email, password } = req.body

            if (!email) errs = [...errs, 'Add your e-mail']
            else if (!validateEmail(email)) errs = [...errs, 'Invalid e-mail']

            if (password.length < 6) errs = [...errs, 'Password must be at least 6 chars']

            if (errs.length > 0) return res.status(400).json({ msg: errs })

            next()
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}
