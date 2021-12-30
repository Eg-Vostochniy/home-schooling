import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { IResUser } from "../../models/IUser"

export const Notify: React.FC = () => {
    const { notifies } = useAppSelector(state => state.notifyReducer)
    const { token, user, msg } = useAppSelector(state => state.authReducer)
    const { addNewUser, deleteNotify } = useAppDispatch()

    const handleAccept = (userR: IResUser, idNtf: string) => {
        addNewUser(userR, { token, user, msg })
        deleteNotify(idNtf, token)
    }

    const handleRefuse = (id: string) => {
        deleteNotify(id, token)
    }

    return (
        <div className='notify'>
            {
                notifies.length > 0 ?
                    notifies.map(ntf => (
                        ntf.content === 'confirm' ?
                            <div key={ntf._id} className='confirm_block'>
                                <div>{ntf.title}</div>
                                <div>
                                    <button
                                        onClick={() => handleAccept(ntf.user, ntf._id)}
                                    >Ок
                                    </button>
                                    <button
                                        onClick={() => handleRefuse(ntf._id)}
                                    >Отмена
                                    </button>
                                </div>
                            </div> :
                            <div key={ntf._id} className='notify_block'>
                                <div>{ntf.title}</div>
                                <div>{ntf.content}</div>
                                <span onClick={() => handleRefuse(ntf._id)}>X</span>
                            </div>
                    )) :
                    <div>Уведомлений нету</div>
            }
        </div>
    )
}


