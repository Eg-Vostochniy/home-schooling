import { useEffect, useState } from "react"
import { setTimeout } from "timers"

export const AlertContent: React.FC<{ content: string, classNm: string }> = ({ content, classNm }) => {
    const [isAlert, setIsAlert] = useState(false)

    useEffect(() => {
        content ? setIsAlert(true) : setIsAlert(false)
    }, [content])

    useEffect(() => {
        if (isAlert) {
            setTimeout(() => {
                setIsAlert(false)
            }, 7000)
        }
        return () => clearTimeout()
    }, [isAlert])

    const handleClose = () => {
        setIsAlert(false)
    }
    return (
        <>
            {
                isAlert && <div className={`alert ${classNm}`}>
                    <div><span onClick={handleClose}>&times;</span></div>
                    <div>{content}</div>
                </div>
            }
        </>
    )
}


