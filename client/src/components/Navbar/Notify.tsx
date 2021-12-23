import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"

export const Notify: React.FC = () => {
    const { notifies } = useAppSelector(state => state.notifyReducer)
    const { token } = useAppSelector(state => state.authReducer)
    const { addNewUser, deleteNotify } = useAppDispatch()

    const handleAccept = (userId: string, idNtf: string) => {
        addNewUser(userId, token)
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
                            <div key={ntf._id}>
                                <div>{ntf.title}</div>
                                <button onClick={() => handleAccept(ntf.user._id, ntf._id)}>Ок</button>
                                <button onClick={() => handleRefuse(ntf._id)}>Отмена</button>
                            </div> :
                            <div key={ntf._id}>
                                <div>{ntf.title}</div>
                                <div>{ntf.content}</div>
                            </div>
                    )) :
                    <div>Уведомлений нету</div>
            }
        </div>
    )
}


