import { Portal } from "./Portal"
import loading from '../../img/Spinner-1s-200px.gif'
import { useClickOutside } from "../../hooks/useClickOutside"
import { useRef, useState } from "react"
import { Avatar } from "../Avatar"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import groupAva from '../../img/mad-scientist 2.png'
import { useAppSelector } from "../../hooks/useAppSelector"

type Props = {
    onClose: () => void
    lessonData: any
    setIsEditOpen: (b: boolean) => void
}

export const EditLessonPopup: React.FC<Props> = ({ onClose, lessonData, setIsEditOpen }) => {
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, onClose)

    const [isLoad, setIsLoad] = useState(false)
    const [statusValue, setStatusValue] = useState('2')

    const { deleteLesson,
        updateLessonStatus,
        isAddingResultsModal,
        setLessonStudents } = useAppDispatch()
    const { token } = useAppSelector(state => state.authReducer)

    const handleChangeStatus = (e: any) => {
        setStatusValue(e.target.value)
    }

    const handleUpdateLesson = async () => {
        try {
            setIsLoad(true)
            await updateLessonStatus(lessonData._id, statusValue, token)
            setIsLoad(false)
            setIsEditOpen(false)
            statusValue === '2' && setDataForLessonResultsModal()
        } catch (err: any) {
            setIsLoad(false)
            setIsEditOpen(false)
            throw new Error(err)
        }
    }
    const handleDeleteLesson = async () => {
        setIsLoad(true)
        await deleteLesson(lessonData._id, token)
        setIsLoad(false)
        setIsEditOpen(false)
    }
    const setDataForLessonResultsModal = () => {
        isAddingResultsModal(true)
        lessonData.lessonType === 'group' ?
            setLessonStudents(lessonData.lessonUser.groupUsers) :
            setLessonStudents([lessonData.lessonUser._id])
    }

    return (
        <Portal>
            <div className='popup_block'>
                <div className='popup_container' ref={ref}>
                    <div className='popup_header'>
                        <span>Урок</span>
                        <span
                            className='popup_close'
                            onClick={onClose}
                        >&times;</span>
                    </div>
                    {
                        lessonData.lessonStatus === '1' &&
                        <div className='popup_content'>
                            <label className='edit_popup_content'>
                                <span>Изменить статус урока</span>
                                <select onChange={handleChangeStatus} value={statusValue}>
                                    <option value='2'>Урок успешно проведен</option>
                                    <option value='3'>Урок отменен</option>
                                </select>
                            </label>
                        </div>
                    }
                    <div className='added_searched-users'>
                        {
                            lessonData.lessonType === 'user' ?
                                <div className='edit_lesson_popup-user'>
                                    <Avatar url={lessonData.lessonUser.avatar} size='medium' />
                                    <div>
                                        <span>{lessonData.lessonUser.username}</span>
                                        <span>{lessonData.lessonUser.fullname}</span>
                                    </div>
                                </div> :
                                <div className='edit_lesson_popup-group'>
                                    <Avatar url={groupAva} size='medium' />
                                    <div>
                                        <span>{lessonData.lessonUser.groupName}</span>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className='edit_lessons-buttons'>
                        <button disabled={isLoad} onClick={handleDeleteLesson} >{
                            !isLoad ?
                                'Удалить урок' :
                                <img src={loading} alt='load' />}
                        </button>
                        {
                            lessonData.lessonStatus === '1' &&
                            <button disabled={isLoad} onClick={handleUpdateLesson}>{
                                !isLoad ?
                                    'Завершить урок' :
                                    <img src={loading} alt='load' />}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </Portal >
    )
}