import { useCallback, useState } from "react"
import { useAppSelector } from "../../../hooks/useAppSelector"
import { AddButton } from "../../AddButton"
import { GroupPopup } from "../../Modals/GroupPopup"
import { SearchAddedStudent } from "./SearchAddedStudents"


export const AddGroupPopup: React.FC = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [groupName, setGroupName] = useState('')

    const { searchedGroupUsers } = useAppSelector(state => state.userReducer)

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
                    <GroupPopup
                        groupName={groupName}
                        onClose={handleClose}
                        searchedUsers={searchedGroupUsers}
                    >
                        <SearchAddedStudent
                            addedSearchedUsers={searchedGroupUsers}
                            setGroupName={setGroupName}
                            groupName={groupName}
                        />
                    </GroupPopup>
                )
            }
        </>
    )
}