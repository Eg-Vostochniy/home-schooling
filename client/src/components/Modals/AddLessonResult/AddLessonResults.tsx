import { useState } from "react"
import { Portal } from "../Portal"
import { InputUserResults } from "./InputUserResults"

export const AddLessonResults: React.FC = () => {
    const [isResultsMode, setIsResultsMode] = useState(false)
    const [lessonName, setLessonName] = useState('')

    return (
        <Portal>
            <div className='popup_block'>
                <div className='popup_container'>
                    <div className='popup_header'>
                        <span>Оцените студентов</span>
                    </div>
                    <div className='adding_results'>
                        {
                            !isResultsMode ?
                                <div className='lesson_name'>
                                    <label>
                                        <span>Название урока</span>
                                        <input
                                            value={lessonName}
                                            onChange={(e) => setLessonName(e.target.value)}
                                        />
                                    </label>
                                    <button onClick={() => setIsResultsMode(true)}>Ввести</button>
                                </div> :
                                <InputUserResults lessonName={lessonName} />
                        }

                    </div>

                </div>
            </div>

        </Portal>
    )
}