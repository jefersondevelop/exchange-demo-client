import { signOutDueSessionExpired } from './main'

// TODO: Translate errors with import { translate } from "../tools/translater"

export function doRequest(
    url: any,
    method: any,
    body: any,
    user: any,
    isFormData: boolean = false,
    dispatch: any,
    successFunction: any,
    failedFunction: any,
    showSuccessMessage: boolean = false,
    showFailedMessage: boolean = false,
    auxiliarResponse: any = null,
    justNotify: boolean = false,
    alert: any = null
) {

    let basicHeader: any = {}
    // let cookie = document.cookie;
    if (!isFormData) {
        basicHeader = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                sessionId: user?.sessionId ? user.sessionId : null
            }
        }
    } else {
        basicHeader = {
            headers: {
                sessionId: user?.sessionId ? user.sessionId : null
            }
        }
    }

    if (user && user.token) {
        basicHeader = Object.assign({}, basicHeader, {
            headers: Object.assign({}, basicHeader.headers, {
                'Authorization': `Bearer ${user.token}`
            })
        })
    }

    switch (method) {

        case 'POST':
            basicHeader = (!isFormData && body) ?
                Object.assign({}, basicHeader, {
                    method: 'POST',
                    body: JSON.stringify(body)
                }) :
                Object.assign({}, basicHeader, {
                    method: 'POST',
                    body
                })
            break;

        case 'PUT':
            basicHeader = (!isFormData && body) ?
                Object.assign({}, basicHeader, {
                    method: 'PUT',
                    body: JSON.stringify(body)
                }) :
                Object.assign({}, basicHeader, {
                    method: 'PUT',
                    body
                })
            break;

        case 'DELETE':
            basicHeader = Object.assign({}, basicHeader, {
                method: 'DELETE'
            })
            break;

        default:
            basicHeader = Object.assign({}, basicHeader, {
                method: 'GET'
            })

            break;

    }


    return fetch(url, basicHeader)
        .then(
            (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((err) => {
                        err.status = response.status
                        throw err;
                    });
                }
            }
        )
        .then(json => {
            if (json && json.status !== 500) {
                if (showSuccessMessage) {
                    if (!alert) {
                        console.log(json.message, 'success', 200)
                    }
                    alert.enqueueSnackbar(
                        json.message,
                        {
                            variant: 'success',
                            autoHideDuration: 3000,
                            action: alert.action,
                        }
                    )
                }
                if (justNotify) {
                    dispatch(successFunction())
                } else {
                    if (typeof json.data !== "object" && auxiliarResponse) {
                        dispatch(successFunction(auxiliarResponse));
                    } else {
                        dispatch(successFunction(json.data));
                    }
                }
            } else {
                if (showFailedMessage) {
                    if (!alert) {
                        console.log(json.message, 'error');
                    }
                    alert.enqueueSnackbar(
                        json.message,
                        {
                            variant: 'error',
                            autoHideDuration: 3000,
                            action: alert.action,
                        }
                    )
                }
                dispatch(failedFunction());
            }
        })
        .catch(async error => {
            if (error.message === 'Validation failed') {
                for (let i in error.data.errors) {
                    error.data.errors[i].map(async (e: string) => {
                        // TODO: Translate error with let text = await translate(e, 'es');
                        alert.enqueueSnackbar(
                            e,
                            {
                                variant: 'error',
                                autoHideDuration: 3000,
                                action: alert.action,
                            }
                        )
                        return e;
                    })
                }

                dispatch(failedFunction());
                return;
            }
            dispatch(failedFunction());
            if (error.status === 403) {
                // dispatch(unauthorizedUserRequest()) 
                return;
            }
            if (error.status === 401) {
                dispatch(signOutDueSessionExpired());
            }
            if (error.err) {
                if (showFailedMessage) {
                    if (!alert) {
                        console.log(error.err.message, 'errors');
                    }
                    alert.enqueueSnackbar(
                        error.err.message,
                        {
                            variant: 'error',
                            autoHideDuration: 3000,
                            action: alert.action,
                        }
                    )
                }
            }
            if (showFailedMessage) {
                if (!alert) {
                    console.log(error.message, 'errors');
                }
                alert.enqueueSnackbar(
                    error.message,
                    {
                        variant: 'error',
                        autoHideDuration: 3000,
                        action: alert.action,
                    }
                )
            }
        });
}