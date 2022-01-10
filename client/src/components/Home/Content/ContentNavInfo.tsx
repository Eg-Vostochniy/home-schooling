import { useEffect, useState } from "react"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { IResUser } from "../../../models/IUser"
import { Avatar } from "../../Avatar"

type Props = {
    handlePrevWeek: () => void
    handleTodayWeek: () => void
    handleNextWeek: () => void
    active: number
}

export const ContentNavInfo: React.FC<Props> = (
    {
        handlePrevWeek,
        handleTodayWeek,
        handleNextWeek,
        active
    }) => {
    const { role, roleUsers } = useAppSelector(state => state.authReducer.user)
    const { setCurrentStudentPerformance } = useAppDispatch()

    const [isStudentList, setIsStudentList] = useState(false)

    const [activeStudent, setActiveStudent] = useState(roleUsers[0])
    useEffect(() => {
        setCurrentStudentPerformance(activeStudent._id)
    }, [activeStudent])

    const handleStudentsList = () => {
        setIsStudentList(!isStudentList)
    }

    const handleUserPerformance = (student: IResUser) => {
        setActiveStudent(student)
    }

    return (
        <>
            {
                active === 1 ?
                    <div className='nav-buttons'>
                        <span onClick={handlePrevWeek}>&lt;</span>
                        <span onClick={handleTodayWeek}>сегодня</span>
                        <span onClick={handleNextWeek}>&gt;</span>
                    </div> :
                    role === 'teacher' ?
                        <div onClick={handleStudentsList} className='users_select-nav'>
                            <div>
                                <Avatar url={activeStudent.avatar} size="small" />
                                <span>{activeStudent.username}</span>
                                <svg
                                    id={`${isStudentList ? 'arrow-nav' : 'arrow-nav-active'}`}
                                    width='13'
                                    height='13'
                                    viewBox='0 0 5 9'
                                >
                                    <path
                                        d='M0.419,9.000 L0.003,8.606 L4.164,4.500 
                                    L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z'
                                    />
                                </svg>
                            </div>
                            {
                                isStudentList &&
                                <div className='users_select-list-nav'>
                                    {
                                        roleUsers.map(rU => (
                                            <div
                                                key={rU._id}
                                                onClick={() => handleUserPerformance(rU)}
                                            >
                                                <Avatar url={rU.avatar} size="small" />
                                                <span>{rU.username}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div> : null
            }
        </>
    )
}
