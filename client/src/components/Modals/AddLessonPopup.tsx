import { useRef, useState } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useClickOutside } from "../../hooks/useClickOutside"
import { Avatar } from "../Avatar"
import { Portal } from "./Portal"
import loading from '../../img/Spinner-1s-200px.gif'
import { Moment } from "moment"
import groupAva from '../../img/mad-scientist 2.png'
import { IResGroup, IResUser } from "../../models/IUser"

type Props = {
    onClose: () => void
    dataCell: Moment
}

type DataForLesson = {
    type: string
    data: IResGroup | IResUser
}

export const AddLessonPopup: React.FC<Props> = ({ onClose, dataCell }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [err, setErr] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [dataForLesson, setDataForLesson] = useState({
        data: {
            _id: ''
        },
        type: ''
    } as DataForLesson)

    const { token, user } = useAppSelector(state => state.authReducer)

    const { createNotify, createLesson } = useAppDispatch()

    useClickOutside(ref, onClose)

    const [active, setActive] = useState(1)

    const arr = [
        { id: 1, name: 'Ученики', className: 'add_user' },
        { id: 2, name: 'Группы', className: 'add_group' }
    ]

    const setNewLesson = async () => {
        if (!dataForLesson.data._id) setErr('Вы не добавили пользователя')
        else {
            setIsLoad(true)
            await createNotify({
                title: `Новый урок`,
                content: `${user.username} запланировал 
                ${dataCell.format('YYYY-MM-DD  HH:00')} с вами урок`,
                recipients: [dataForLesson.data._id]
            }, token)

            await createLesson({
                lessonStart: dataCell.format(),
                lessonStatus: '1',
                lessonType: dataForLesson.type,
                lessonUser: dataForLesson.data,
                teacher: user._id
            }, token)
            setIsLoad(false)
            onClose()
        }
    }

    return (
        <Portal>
            <div className='popup_block'>
                <div className='popup_container' ref={ref}>
                    <div className='popup_header'>
                        <span>Новый урок</span>
                        <span
                            className='popup_close'
                            onClick={onClose}
                        >&times;</span>
                    </div>
                    <div className='add_lesson_popup_content'>
                        <span>Время урока:</span>
                        <span>
                            {dataCell.format('YYYY-MM-DD  HH:00')}
                        </span>
                    </div>
                    <div className='add_lesson_popup-nav'>
                        {
                            arr.map(a => (
                                <span
                                    className={`${a.className} ${active === a.id ? 'active' : ''}`}
                                    key={a.id}
                                    onClick={() => setActive(a.id)}
                                >{a.name}
                                </span>
                            ))
                        }
                    </div>
                    {active === 1 ?
                        <div className='add_searched_lesson_users-popup'>
                            {
                                user.roleUsers.length !== 0 ?
                                    user.roleUsers.map(userR => (
                                        <div
                                            key={userR._id}
                                            className={
                                                `${dataForLesson.data._id === userR._id ?
                                                    'add_lesson_users-popup-active' :
                                                    'add_lesson_users-popup'}`
                                            }
                                            onClick={() => setDataForLesson({ data: userR, type: 'user' })}
                                        >
                                            <Avatar url={userR.avatar} size='small' />
                                            <div>
                                                <div>{userR.username}</div>
                                                <div>{userR.fullname}</div>
                                            </div>
                                        </div>
                                    )) :
                                    <div>У вас нету учеников</div>
                            }
                        </div> :
                        <div>
                            {
                                user.groupAddedUsers.length !== 0 ?
                                    user.groupAddedUsers.map(group => (
                                        <div
                                            key={group._id}
                                            className={
                                                `${dataForLesson.data._id === group._id ?
                                                    'add_lesson_users-popup-active' :
                                                    'add_lesson_users-popup'}`
                                            }
                                            onClick={
                                                () => setDataForLesson({
                                                    data: {
                                                        ...group,
                                                        groupUsers: group.groupUsers.filter(gU => (
                                                            gU !== user._id
                                                        ))
                                                    },
                                                    type: 'group'
                                                })
                                            }
                                        >
                                            <img src={groupAva} alt='ava' />
                                            <div>
                                                <div>{group.groupName}</div>
                                            </div>
                                        </div>
                                    )) :
                                    <div>У вас нету групп</div>
                            }
                        </div>
                    }
                    {err && <div>{err}</div>}
                    <button
                        disabled={isLoad}
                        onClick={setNewLesson}
                    >{
                            !isLoad ?
                                'Запланировать урок' :
                                <img src={loading} alt='load' />}</button>
                </div>
            </div>
        </Portal>
    )
}