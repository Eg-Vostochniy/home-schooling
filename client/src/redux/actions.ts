import { alertActions } from './alert/actions'
import { authActions, authThunks } from './auth/actions'
import { lessonActions, lessonThunks } from './lesson/actions'
import { notifyActions, notifyThunks } from './notify/actions'
import { userActions, userThunks } from './user/actions'

export const allActions = {
    ...authActions,
    ...authThunks,
    ...alertActions,
    ...userActions,
    ...userThunks,
    ...notifyActions,
    ...notifyThunks,
    ...lessonActions,
    ...lessonThunks
}