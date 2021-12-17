import { useCallback, useState } from "react"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { AddButton } from "../../AddButton"
import { Popup } from "../../Modals/Popup"
import { SearchAddedStudent } from "./SearchAddedStudents"


export const AddGroupPopup: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const { searchedUsers } = useAppSelector(state => state.userReducer)

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [])
    const handleOpen = useCallback(() => {
        setIsOpen(true)
    }, [])
    return (
        <>
            <AddButton handleOpen={handleOpen}>{children}</AddButton>
            {
                isOpen && (
                    <Popup
                        onClose={handleClose}
                        popupName='Выберите, кого добавить в группу'
                        popupButton='Добавить группу'
                        searchedUsers={searchedUsers}
                    >
                        <SearchAddedStudent addedSearchedUsers={searchedUsers} />
                    </Popup>
                )
            }
        </>
    )
}