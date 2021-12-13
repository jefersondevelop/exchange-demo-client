import { doRequest } from "./index";

export const REQUEST_USERS = 'REQUEST_USERS';
export const REQUEST_USERS_SUCCEDED = 'REQUEST_USERS_SUCCEDED'
export const REQUEST_USERS_FAILED = 'REQUEST_USERS_FAILED'


function requestUsers() {
    return {
        type: REQUEST_USERS
    }
}

function requestUsersSucceded(users: any[]) {
    return {
        type: REQUEST_USERS_SUCCEDED,
        users
    }
}

function requestUsersFailed() {
    return {
        type: REQUEST_USERS_FAILED
    }
}

export function fetchGetAllUsers(alertElement: any) {

    return function (dispatch: CallableFunction, getState: any) {

        dispatch(requestUsers());

        let mainUser = getState().main.user

        doRequest(
            `${process.env.REACT_APP_API_URL}/users/`,
            'GET',
            null,
            mainUser,
            false,
            dispatch,
            requestUsersSucceded,
            requestUsersFailed,
            false,
            false,
            null,
            false,
            alertElement
        )

    }

}