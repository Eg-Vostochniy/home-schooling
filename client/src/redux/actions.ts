import { alertActions } from './alert/actions';
import { authActions, authThunks } from './auth/actions';
import { userActions, userThunks } from './user/actions';
export const allActions = {
    ...authActions,
    ...authThunks,
    ...alertActions,
    ...userActions,
    ...userThunks
}