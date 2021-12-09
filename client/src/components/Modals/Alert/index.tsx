import { useAppSelector } from "../../../hooks/useAppSelector"
import { AlertContent } from "./AlertContent"
import { Loading } from "./Loading"

export const Alert: React.FC = () => {
    const { success, error, loading } = useAppSelector(state => state.alertReducer)
    return (
        <div>
            {
                loading && <Loading />
            }
            {
                error ?
                    <AlertContent content={error} classNm='error' /> :
                    <AlertContent content={success} classNm='success' />
            }

        </div>
    )
}


