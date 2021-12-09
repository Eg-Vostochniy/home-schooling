import { allActions } from './../redux/actions';
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"

export const useAppDispatch = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}