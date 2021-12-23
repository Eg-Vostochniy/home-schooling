import { useAppSelector } from '../../hooks/useAppSelector'
import calendar from '../../img/calendar 1.png'
import { AddUserPopup } from "./AddUserModal/AddUserPopup"
import { Content } from '././Content/index'

type Props = {
    content: string
    btnContent: string
}

export const HomeContent: React.FC<Props> = ({ content, btnContent }) => {
    const { roleUsers } = useAppSelector(state => state.authReducer.user)
    return (
        <div className='home_content'>
            <Content />
            {
                roleUsers.length === 0 && (
                    <div className='timetable_stub'>
                        <img src={calendar} alt='calendar' />
                        <div className='text'>{content}</div>
                        <AddUserPopup>{btnContent}</AddUserPopup>
                    </div>
                )
            }
        </div>
    )
}