export const AlertContent: React.FC<{ content?: string, classNm: string }> = ({ content, classNm }) => {
    const handleClose = () => {

    }
    return (
        <div className={`alert ${classNm}`}>
            <div><span onClick={handleClose}>&times;</span></div>
            <div>{content}</div>
        </div>
    )
}


