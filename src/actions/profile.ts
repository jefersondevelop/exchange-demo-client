import { doRequest } from "./index"
import { User } from "models"
import { areChanginPassValid, areUpdateProfileValid, imageHasFormatValid } from "./validations"

export const REQUEST_PROFILE_DATA = 'REQUEST_PROFILE_DATA'
export const REQUEST_PROFILE_DATA_SUCCEDED = 'REQUEST_PROFILE_DATA_SUCCEDED'
export const REQUEST_PROFILE_DATA_FAILED = 'REQUEST_PROFILE_DATA_FAILED'

export const REQUEST_UPDATE_PROFILE_IMG = 'REQUEST_UPDATE_PROFILE_IMG'
export const REQUEST_UPDATE_PROFILE_SUCCEDED = 'REQUEST_UPDATE_PROFILE_SUCCEDED'
export const REQUEST_UPDATE_PROFILE_FAILED = 'REQUEST_UPDATE_PROFILE_FAILED'

export const REQUEST_UPDATE_PROFILE_IMG_SUCCEDED = 'REQUEST_UPDATE_PROFILE_IMG_SUCCEDED'
export const REQUEST_UPDATE_PROFILE_IMG_FAILED = 'REQUEST_UPDATE_PROFILE_IMG_FAILED'

export const HANDLE_PROFILE_INPUT_CHANGE = 'HANDLE_PROFILE_INPUT_CHANGE'

function requestProfileData() {
    return {
        type: REQUEST_PROFILE_DATA
    }
}

function requestUpdateImg() {
    return {
        type: REQUEST_UPDATE_PROFILE_IMG
    }
}

function requestProfileDataSucceded(user: User) {

    return {
        type: REQUEST_PROFILE_DATA_SUCCEDED,
        profile: user
    }

}

function requestProfileDataFailed() {

    return {
        type: REQUEST_PROFILE_DATA_FAILED
    }

}

function requestUpdateProfileSucceded(user: User) {

    return {
        type: REQUEST_UPDATE_PROFILE_SUCCEDED,
        user
    }

}

function requestUpdateProfileFailed() {

    return {
        type: REQUEST_UPDATE_PROFILE_FAILED
    }

}

function requestUpdateProfileImgSucceded(user: User) {

    return {
        type: REQUEST_UPDATE_PROFILE_IMG_SUCCEDED,
        user
    }

}

function requestUpdateProfileImgFailed() {

    return {
        type: REQUEST_UPDATE_PROFILE_IMG_FAILED
    }

}

export function handleProfileInputChange(event: any) {

    return {
        type: HANDLE_PROFILE_INPUT_CHANGE,
        event
    }

}

export function fetchProfileData(alert: any) {

    return function (dispatch: CallableFunction, getState: any) {

        let mainUser = getState().main.user;

        doRequest(
            `${process.env.REACT_APP_API_URL}/users/profile`,
            'GET',
            null,
            mainUser,
            false,
            dispatch,
            requestProfileDataSucceded,
            requestProfileDataFailed,
            false,
            true,
            null,
            false,
            alert
        )

    }

}

export function fetchUpdateProfile(user: User, isChangingPass: boolean = false, alert: any) {

    return function (dispatch: CallableFunction, getState: any) {

        let mainUser = getState().main.user;
        let formData = new FormData();

        let userToUpdate: any = {
            ...user.profile
        }

        if (!areUpdateProfileValid(user.profile)) {
            return alert.enqueueSnackbar(
                'Ingrese datos válidos para el perfil.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
        }

        if (isChangingPass && !areChanginPassValid(user)) {
            return alert.enqueueSnackbar(
                'Ingrese datos válidos para el cambio de contraseña.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
        }

        if (!isChangingPass) {
            delete user.password;
            delete user.newPassword;
            delete user.confirmPassword;
        } else {
            userToUpdate = Object.assign({}, userToUpdate, {
                password: user.password,
                newPassword: user.newPassword
            })
        }

        for (let i in userToUpdate) {

            formData.append(i, userToUpdate[i]);

        }

        dispatch(requestProfileData());

        doRequest(
            `${process.env.REACT_APP_API_URL}/users/profile`,
            'PUT',
            formData,
            mainUser,
            true,
            dispatch,
            requestUpdateProfileSucceded,
            requestUpdateProfileFailed,
            true,
            true,
            null,
            false,
            alert
        )


    }

}

export function fectchUpdateProfileImg(event: any, alert: any = null) {


    return function (dispatch: CallableFunction, getState: any) {

        if (!imageHasFormatValid(event.target.files[0])) {
            return alert.enqueueSnackbar(
                'Formato de archivo no válido.',
                {
                    variant: 'error',
                    autoHideDuration: 3000,
                    action: alert.action,
                }
            )
        }

        let mainUser = getState().main.user;

        const file = new FormData();
        file.append("selfie", event.target.files[0]);

        dispatch(requestUpdateImg());

        doRequest(
            `${process.env.REACT_APP_API_URL}/users/profile/selfie`,
            'PUT',
            file,
            mainUser,
            true,
            dispatch,
            requestUpdateProfileImgSucceded,
            requestUpdateProfileImgFailed,
            true,
            true,
            null,
            false,
            alert
        )

    }

} 