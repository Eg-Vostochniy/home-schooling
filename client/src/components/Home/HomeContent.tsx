import calendar from '../../img/calendar 1.png'
import { AddUserPopup } from "./AddUserModal/AddUserPopup"

export const HomeContent: React.FC = () => {
    const users = []
    return (
        <div className='home_content'>
            <button>dsfds</button>
            {
                users.length === 0 && (
                    <div className='timetable_stub'>
                        <img src={calendar} alt='calendar' />
                        <div className='text'>
                            Для планирования уроков в расписании сначала добавьте учеников
                        </div>
                        <AddUserPopup>Добавить ученика</AddUserPopup>
                    </div>
                )
            }
        </div>
    )
}