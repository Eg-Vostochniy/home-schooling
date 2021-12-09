import calendar from '../img/calendar 1.png'

export const Home: React.FC = () => {
    const users = []
    return (
        <div className='home'>
            <div className='adding_block'>
                <div className='adding_menu-title'>
                    <h4>Мои ученики</h4>
                    <div className='adding_menu'>
                        <span>Ученики</span>
                        <span>Группы</span>
                    </div>
                </div>
                <div className="adding_info">
                    <div className='adding_info-buttons'>
                        <button>Добавить ученика</button>
                        <button>Создать группу</button>
                    </div>
                    <div className='add_student'>
                        Добавить ученика
                    </div>
                </div>
            </div>
            <div className='home_content'>
                <button>dsfds</button>
                {
                    users.length === 0 && (
                        <div className='timetable_stub'>
                            <img src={calendar} alt='calendar' />
                            <div className='text'>
                                Для планирования уроков в расписании сначала добавьте учеников
                            </div>
                            <button>Добавить ученика</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


