export const AddButton: React.FC<{ handleOpen: () => void }> = ({ children, handleOpen }) => {
    return (
        <>
            <button onClick={handleOpen}>{children}</button>
        </>
    )
}


