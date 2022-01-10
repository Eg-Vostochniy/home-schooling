import { useState } from "react"
import { InputChange } from "../../../App"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { Avatar } from "../../Avatar"

export const InputUserResults: React.FC<{ lessonName: string }> = ({ lessonName }) => {
    const { lessonStudents } = useAppSelector(state => state.academicPerformanceReducer)
    const { roleUsers, _id } = useAppSelector(state => state.authReducer.user)
    const { token } = useAppSelector(state => state.authReducer)

    const { addLessonResults, isAddingResultsModal } = useAppDispatch()

    const [studentLessonResults, setStudentLessonResults] = useState({
        exercisesCount: 0,
        exercisesDone: 0,
        mistakes: 0,
        inaccuracies: 0,
        grade: 0
    })

    const handleChangeInput = (e: InputChange) => {
        const { name, value } = e.target
        setStudentLessonResults({ ...studentLessonResults, [name]: value })
    }

    const handleSubmitStudentsResults = async () => {
        if (lessonStudents.length === 1) {
            await addLessonResults({
                lessonName,
                teacher: _id,
                student: lessonStudents[0],
                ...studentLessonResults
            }, token)
            isAddingResultsModal(false)
        }
    }

    return (
        <>
            {
                lessonStudents.map(lS => (
                    <div key={lS}>
                        <div>
                            {
                                roleUsers.map(rU => (
                                    rU._id === lS &&
                                    <div key={rU._id}>
                                        <Avatar url={rU.avatar} size='small' />
                                        <span>{rU.username}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <label>
                            <span>Упражнений в уроке</span>
                            <input
                                type='number'
                                name='exercisesCount'
                                value={studentLessonResults.exercisesCount}
                                onChange={handleChangeInput}
                            />
                        </label>
                        <label>
                            <span>Упражнений выполнено</span>
                            <input
                                type='number'
                                name='exercisesDone'
                                value={studentLessonResults.exercisesDone}
                                onChange={handleChangeInput}
                            />
                        </label>
                        <label>
                            <span>Ошибок</span>
                            <input
                                type='number'
                                name='mistakes'
                                value={studentLessonResults.mistakes}
                                onChange={handleChangeInput}
                            />
                        </label>
                        <label>
                            <span>Неточности</span>
                            <input
                                type='number'
                                name='inaccuracies'
                                value={studentLessonResults.inaccuracies}
                                onChange={handleChangeInput}
                            />
                        </label>
                        <label>
                            <span>Оценка</span>
                            <input
                                type='number'
                                name='grade'
                                value={studentLessonResults.grade}
                                onChange={handleChangeInput}
                            />
                        </label>
                    </div>
                ))
            }

            <div className='adding_results-button'>
                <button onClick={handleSubmitStudentsResults}>Оценить</button>
            </div>
        </>
    )
}