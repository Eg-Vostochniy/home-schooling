import { alertActions } from './alert/actions';
import { authActions, authThunks } from './auth/actions';
export const allActions = {
    ...authActions,
    ...authThunks,
    ...alertActions
}