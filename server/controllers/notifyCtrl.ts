import { Response } from "express"
import { IReqAuth } from "../config/Interface"
import Notifies from "../models/notifyModel"

export const notifyCtrl = {
    getNotifies: async (req: IReqAuth, res: Response) => {
        try {
            const { user } = req
            if (user) {
                const notifies = await Notifies.find({
                    recipients: user._id
                }).sort('-createdAt').populate('user', 'username avatar fullname')
                return res.json(notifies)
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createNotify: async (req: IReqAuth, res: Response) => {
        try {
            const { recipients, title, content } = req.body
            const { user } = req
            if (user) {
                if (recipients.includes(user._id.toString())) return

                const notifies = new Notifies({
                    user: user._id,
                    recipients,
                    title,
                    content
                })

                await notifies.save()
                return res.json(notifies)
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteNotify: async (req: IReqAuth, res: Response) => {
        try {
            const { id } = req.query
            const { user } = req
            if (user) {
                const ntf = await Notifies.findById(id)
                if (!ntf) return res.status(400).json({ msg: 'This notify does not exist' })

                if (ntf?.recipients.length === 1) {
                    await Notifies.findByIdAndDelete(id)
                    return res.json({ msg: 'Notify deleted' })
                }

                await ntf?.update({ $pull: { recipients: user._id } })
                return res.json({ msg: 'Notify deleted' })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },

}