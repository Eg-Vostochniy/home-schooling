import { Moment } from 'moment'
import { memo, useState } from 'react'
import { AddLessonPopup } from '../../Modals/AddLessonPopup'
import { TimetableCell } from './TimetableCell'

type Props = {
    cellsList: Moment[]
    weekDays: string[]
    dayHours: string[]
}

export const Timetable: React.FC<Props> = memo(({ cellsList, weekDays, dayHours }) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [dataCell, setDataCell] = useState<Moment>()

    const handleClosePopup = () => {
        setIsOpenPopup(false)
    }

    return (
        <div className='timetable_content'>
            {isOpenPopup && dataCell &&
                <AddLessonPopup onClose={handleClosePopup} dataCell={dataCell} />}
            <div className='timetable_hours-grid'>
                <div className='timetable_hours'>
                    {
                        dayHours.map(hour => (
                            <div key={hour}>{hour}</div>
                        ))
                    }
                </div>
                <div>
                    <div className='timetable_header'>
                        {
                            weekDays.map(week => (
                                <div key={week}>{week}</div>
                            ))
                        }
                    </div>
                    <div className='timetable_grid'>
                        {
                            cellsList.map(cell => (
                                <TimetableCell
                                    key={cell.unix()}
                                    cell={cell}
                                    setDataCell={setDataCell}
                                    setIsOpenPopup={setIsOpenPopup}
                                />
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})
