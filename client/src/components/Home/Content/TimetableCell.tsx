import { Moment } from 'moment'
import { memo, useState } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { Avatar } from '../../Avatar'
import groupAva from '../../../img/mad-scientist 2.png'
import { EditLessonPopup } from '../../Modals/EditLessonPopup'

type Props = {
    cell: Moment
    setDataCell: (d: Moment) => void
    setIsOpenPopup: (b: boolean) => void
}

export const TimetableCell: React.FC<Props> = memo(({ cell, setDataCell, setIsOpenPopup }) => {
    const { lessons } = useAppSelector(state => state.lessonReducer)
    const { role } = useAppSelector(state => state.authReducer.user)

    const [isEditLesson, setIsEditOpen] = useState(false)
    const [lessonData, setLessonData] = useState()

    const handleOpenPopupLesson = (dataCell: Moment) => {
        setIsOpenPopup(true)
        setDataCell(dataCell)
    }

    const handleCloseEditLesson = () => {
        setIsEditOpen(false)
    }
    const handleOpenEditLesson = (lesson: any) => {
        setLessonData(lesson)
        setIsEditOpen(true)
    }

    const getLessonStatus = (status: string) => {
        if (status === '1') return 'one'
        if (status === '2') return 'two'
        if (status === '3') return 'three'
    }

    return (
        <div key={cell.unix()} className='timetable_cell'>
            {
                role === 'teacher' ?
                    lessons.find(ls => ls.lessonStart === cell.format()) ?
                        lessons.map((l: any) => l.lessonStart === cell.format() && (
                            <div
                                className={`cell_lesson ${getLessonStatus(l.lessonStatus)}`}
                                key={l._id}
                                onClick={() => handleOpenEditLesson(l)}
                            >
                                {
                                    l.lessonType === 'user' ?
                                        <div className='user_cell'>
                                            <Avatar url={l.lessonUser.avatar} size='tiny' />
                                            <div>
                                                <span>{l.lessonUser.username}</span>
                                                <span>{l.lessonUser.fullname}</span>
                                            </div>

                                        </div> :
                                        <div className='group_cell'>
                                            <img src={groupAva} alt='ava' />
                                            <span>{l.lessonUser.groupName}</span>
                                        </div>
                                }
                            </div>
                        )) :
                        <div className='new_lesson'>
                            <span onClick={() => handleOpenPopupLesson(cell)}
                            >Новый урок
                            </span>
                        </div> :
                    lessons.find(ls => ls.lessonStart === cell.format()) ?
                        lessons.map((l: any) => l.lessonStart === cell.format() && (
                            <div
                                className={`cell_lesson ${getLessonStatus(l.lessonStatus)}`}
                                key={l._id}
                            >
                                {
                                    l.lessonType === 'user' ? <div className='user_cell'>
                                        <Avatar url={l.teacher.avatar} size='tiny' />
                                        <div>
                                            <span>{l.teacher.username}</span>
                                            <span>{l.teacher.fullname}</span>
                                        </div>

                                    </div> : <div className='group_cell'>
                                        <img src={groupAva} alt='ava' />
                                        <span>{l.lessonUser.groupName}</span>
                                    </div>
                                }
                            </div>
                        )) : null
            }
            {
                isEditLesson &&
                <EditLessonPopup
                    onClose={handleCloseEditLesson}
                    lessonData={lessonData}
                    setIsEditOpen={setIsEditOpen}
                />
            }
        </div>
    )

})
