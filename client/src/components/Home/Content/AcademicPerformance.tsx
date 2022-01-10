import { useAppSelector } from "../../../hooks/useAppSelector"
import { IAcademicPerformance } from "../../../models/IAcademicPerformance"

const getPerformance = (performances: IAcademicPerformance[], id: string) => {
    return performances.filter(p => p.student === id)
}

export const AcademicPerformance: React.FC = () => {
    const performances = useAppSelector(({ academicPerformanceReducer }) => (
        getPerformance(academicPerformanceReducer.performances, academicPerformanceReducer.currentStudentPerformance)
    ))

    return (
        <div className='academic_performance'>
            <div className='performance_nav'>
                <div>Название урока</div>
                <div>Упражнений в уроке</div>
                <div>Упражнений выполнено</div>
                <div>Ошибок</div>
                <div>Неточности</div>
                <div>Оценка</div>
            </div>
            <div className='performances'>
                {
                    performances.map(perf => (
                        <div key={perf._id} className='performance' >
                            <div>{perf.lessonName}</div>
                            <div>{perf.exercisesCount}</div>
                            <div>{perf.exercisesDone}</div>
                            <div>{perf.mistakes}</div>
                            <div>{perf.inaccuracies}</div>
                            <div>{perf.grade}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

