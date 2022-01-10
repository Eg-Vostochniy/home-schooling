import moment from "moment"
import 'moment/locale/ru'
import { useCallback, useState } from "react"
import { AcademicPerformance } from "./AcademicPerformance"
import { ContentNavInfo } from "./ContentNavInfo"
import { Timetable } from "./Timetable"

moment.locale('ru')

const TOTAL_CELLS_IN_GRID = 84
const TOTAL_HOURS_IN_DAY = 12
const TOTAL_WEEKS_IN_GRID = 7

const Nav = [
    { id: 1, name: 'Расписание', className: 'content_nav' },
    { id: 2, name: 'Успеваемость', className: 'progress_nav' }
]

export const Content: React.FC = () => {
    const [active, setActive] = useState(1)
    const [today, setToday] = useState(moment())

    const startDay = today.clone().startOf('week').startOf('day').add(1, 'day')

    const cellsList = [...Array(TOTAL_CELLS_IN_GRID)].map(() => {
        let day = startDay
        if (day.format('HH') === '00') {
            return startDay.add(8, 'hour').clone()
        }
        if (day.format('HH') === '19') {
            return startDay.add(1, 'day').subtract(19, 'hour').add(8, 'hour').clone()
        }
        else {
            return startDay.add(1, 'hour').clone()
        }
    })

    const weekDays = [...Array(TOTAL_WEEKS_IN_GRID)].map((_, index) => (
        today.startOf('week').day(index + 1).format('DD-MMM ddd')
    ))
    const dayHours = [...Array(TOTAL_HOURS_IN_DAY)].map((_, index) => (
        moment().hour(index + 8).format('HH:00')
    ))
    const handlePrevWeek = useCallback(() => {
        setToday(today.subtract(1, 'week').clone())
    }, [today])
    const handleTodayWeek = useCallback(() => {
        setToday(moment())
    }, [])
    const handleNextWeek = useCallback(() => {
        setToday(today.add(1, 'week').clone())
    }, [today])

    return (
        <div className="content">
            <div className='header'>
                <div className='nav-menu'>
                    {
                        Nav.map(n => (
                            <span
                                className={`${n.className} ${active === n.id ? 'active' : ''}`}
                                key={n.id}
                                onClick={() => setActive(n.id)}
                            >{n.name}
                            </span>
                        ))
                    }
                </div>
                <ContentNavInfo
                    handlePrevWeek={handlePrevWeek}
                    handleTodayWeek={handleTodayWeek}
                    handleNextWeek={handleNextWeek}
                    active={active}
                />
            </div>
            <div className="basic_info">
                {
                    active === 1 ?
                        <Timetable
                            cellsList={cellsList}
                            weekDays={weekDays}
                            dayHours={dayHours}
                        /> :
                        <div className='performance_content'>
                            <AcademicPerformance />
                        </div>
                }
            </div>
        </div>
    )
}
