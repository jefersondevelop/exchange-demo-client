import { isNulliFyField, isValidEmail } from "../tools/validations";
import * as mainActions from '../actions/main';
import * as profileActions from '../actions/profile'
import { imageHasFormatValid } from "../actions/validations";

const fields: any = {
    "username": "Nombre",
    "lastname": "Apellido",
    "phoneNumber": "Número de teléfono",
    "birthdate": "Fecha de nacimiento",
    "occupation": "Profesión",
    "birthCountry": "Nacionalidad",
    "documentDate": "Fecha de expedición",
    "documentType": "Tipo de documento",
    "documentNumber": "Número de documento",
    "address": "Dirección",
    "city": "Ciudad"
}

const initialState = {
    user: {
        email: '',
        password: '',
        profile: {
            currentCountry: 'ARG',
            username: ''
        },
        logged: false,
        error: false,
        errorMessage: {
            email: null,
            password: null,
            profile: {
                username: null
            }
        }
    },
    fetchings: {
        profile: {
            isFetchingImg: false,
            isFetchingBasic: false
        }
    },
    isFetching: false,
    themeType: 'light'

};

const mainReducer = (state: any = initialState, action: any): Object => {

    switch (action.type) {


        case mainActions.HANDLE_INPUT_CHANGE:
            switch (action.event.target.name) {
                case 'email':
                    if (!isValidEmail(action.event.target.value)) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: {
                                    email: 'Ingrese un email válido.'
                                }
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            [action.event.target.name]: action.event.target.value,
                            error: false,
                            errorMessage: {}
                        })
                    })
                case 'password':
                    if (isNulliFyField(action.event.target.value)) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                error: true,
                                errorMessage: {
                                    password: 'Ingrese una contraseña.'
                                }
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            [action.event.target.name]: action.event.target.value,
                            error: false,
                            errorMessage: {}
                        })
                    })
                default:
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            [action.event.target.name]: action.event.target.value,
                        })
                    })
            }

        case mainActions.HANDLE_REGISTER_INPUT_CHANGE:
            if (action.event.target.name.startsWith('profile')) {
                switch (action.event.target.name.split('.')[1]) {
                    case 'username':
                        if (isNulliFyField(action.event.target.value)) {
                            return Object.assign({}, state, {
                                user: Object.assign({}, state.user, {
                                    profile: Object.assign({}, state.user.profile, {
                                        [action.event.target.name.split('.')[1]]: action.event.target.value
                                    }),
                                    errorMessage: Object.assign({}, state.user.errorMessage, {
                                        profile: Object.assign({}, state.user.errorMessage.profile, {
                                            username: 'Ingrese un nombre.'
                                        })
                                    })
                                })
                            })
                        }
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                profile: Object.assign({}, state.user.profile, {
                                    [action.event.target.name.split('.')[1]]: action.event.target.value
                                }),
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    profile: Object.assign({}, state.user.errorMessage.profile, {
                                        username: null
                                    })
                                })
                            })
                        })
                    default:
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                profile: Object.assign({}, state.user.profile, {
                                    [action.event.target.name.split('.')[1]]: action.event.target.value
                                })
                            })
                        })

                }
            } else {
                switch (action.event.target.name) {
                    case 'email':
                        if (!isValidEmail(action.event.target.value)) {
                            return Object.assign({}, state, {
                                user: Object.assign({}, state.user, {
                                    [action.event.target.name]: action.event.target.value,
                                    errorMessage: Object.assign({}, state.user.errorMessage, {
                                        email: 'Ingrese un email válido.'
                                    })
                                })
                            })
                        }
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    email: null
                                })
                            })
                        })
                    case 'password':
                        if (isNulliFyField(action.event.target.value)) {
                            return Object.assign({}, state, {
                                user: Object.assign({}, state.user, {
                                    [action.event.target.name]: action.event.target.value,
                                    errorMessage: Object.assign({}, state.user.errorMessage, {
                                        password: 'Ingrese una contraseña.'
                                    })
                                })
                            })
                        }
                        if (!isNulliFyField(state.user.confirmPassword) && action.event.target.value !== state.user.confirmPassword) {
                            return Object.assign({}, state, {
                                user: Object.assign({}, state.user, {
                                    [action.event.target.name]: action.event.target.value,
                                    errorMessage: Object.assign({}, state.user.errorMessage, {
                                        password: 'La contraseña y la de confirmación deben ser iguales.'
                                    })
                                })
                            })
                        }
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    password: null
                                })
                            })
                        })
                    case 'confirmPassword':
                        if (isNulliFyField(action.event.target.value)) {
                            return Object.assign({}, state, {
                                user: Object.assign({}, state.user, {
                                    [action.event.target.name]: action.event.target.value,
                                    errorMessage: Object.assign({}, state.user.errorMessage, {
                                        confirmPassword: 'Ingrese una contraseña.'
                                    })
                                })
                            })
                        }
                        if (action.event.target.value !== state.user.password) {
                            return Object.assign({}, state, {
                                user: Object.assign({}, state.user, {
                                    [action.event.target.name]: action.event.target.value,
                                    errorMessage: Object.assign({}, state.user.errorMessage, {
                                        confirmPassword: 'La contraseña y la de confirmación deben ser iguales.'
                                    })
                                })
                            })
                        }
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    confirmPassword: null,
                                    password: null
                                })
                            })
                        })
                    default:
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                            })
                        })
                }
            }

        case mainActions.REQUEST_MAIN:
            return Object.assign({}, state, {
                isFetching: true
            })

        case mainActions.REQUEST_REGISTER_SUCCEDED:
            return Object.assign({}, state, {
                isFetching: false,
                user: Object.assign({}, state.user, {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    profile: {
                        currentCountry: 'ARG',
                        username: ''
                    },
                    logged: false,
                    error: false,
                    errorMessage: {
                        email: null,
                        password: null,
                        profile: {
                            username: null
                        }
                    }
                })
            })

        case mainActions.REQUEST_REGISTER_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            })

        case mainActions.REQUEST_LOGIN_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            })

        case mainActions.REQUEST_LOGIN_SUCCEDED:
            return Object.assign({}, state, {
                user: Object.assign({}, action.user.user, {
                    token: action.user.token,
                    errorMessage: {
                        profile: {}
                    },
                    logged: true
                }),
                isFetching: false
            })

        case mainActions.REQUEST_RECOVER_PASS_SUCCEDED:
        case mainActions.REQUEST_RECOVER_PASS_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                user: Object.assign({}, state.user, {
                    email: ''
                })
            })

        case mainActions.REQUEST_VALIDATE_CHANGE_PASS_SUCCEDED:
        case mainActions.REQUEST_VALIDATE_CHANGE_PASS_FAILED:
            return Object.assign({}, state, {
                isFetching: false,
                user: Object.assign({}, state.user, {
                    password: '',
                    confirmPassword: ''
                })
            })



        case mainActions.CHANGE_THEME:
            return Object.assign({}, state, {
                themeType: (state.themeType === 'dark') ? 'light' : 'dark'
            })

        // -- PROFILE CASES  

        case profileActions.REQUEST_PROFILE_DATA:
            return Object.assign({}, state, {
                fetchings: Object.assign({}, state.fetchings, {
                    profile: Object.assign({}, state.fetchings.profile, {
                        isFetchingBasic: true
                    })
                })
            })

        case profileActions.HANDLE_PROFILE_INPUT_CHANGE:
            switch (action.event.target.name) {
                case 'username':
                case 'lastname':
                case 'phoneNumber':
                case 'occupation':
                case 'birthCountry':
                case 'documentType':
                case 'documentNumber':
                case 'currentCountry':
                case 'address':
                case 'city':
                    if (
                        isNulliFyField(action.event.target.value) ||
                        (
                            (
                                action.event.target.name === "occupation" ||
                                action.event.target.name === "birthCountry" ||
                                action.event.target.name === "currentCountry" ||
                                action.event.target.name === "documentType"
                            ) &&
                            action.event.target.value === '-1'
                        )
                    ) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                profile: Object.assign({}, state.user.profile, {
                                    [action.event.target.name]: action.event.target.value
                                }),
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    profile: Object.assign({}, state.user.errorMessage.profile, {
                                        [action.event.target.name]: `Ingrese ${fields[action.event.target.name]}`
                                    })
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            profile: Object.assign({}, state.user.profile, {
                                [action.event.target.name]: action.event.target.value
                            }),
                            errorMessage: Object.assign({}, state.user.errorMessage, {
                                profile: Object.assign({}, state.user.errorMessage.profile, {
                                    [action.event.target.name]: null
                                })
                            })
                        })
                    })

                case 'password':
                    if (isNulliFyField(action.event.target.value)) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    password: 'Ingrese una contraseña.'
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.user.errorMessage, {
                                password: null
                            })
                        })
                    })

                case 'newPassword':
                    if (isNulliFyField(action.event.target.value)) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    newPassword: 'Ingrese una nueva contraseña.'
                                })
                            })
                        })
                    }
                    if (!isNulliFyField(state.user.confirmPassword) && action.event.target.value !== state.user.confirmPassword) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    newPassword: 'La nueva contraseña y la de confirmación deben ser iguales.'
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.user.errorMessage, {
                                newPassword: null
                            })
                        })
                    })
                case 'confirmPassword':
                    if (isNulliFyField(action.event.target.value)) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    confirmPassword: 'Ingrese una contraseña.'
                                })
                            })
                        })
                    }
                    if (action.event.target.value !== state.user.newPassword) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                [action.event.target.name]: action.event.target.value,
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    confirmPassword: 'La nueva contraseña y la de confirmación deben ser iguales.'
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            [action.event.target.name]: action.event.target.value,
                            errorMessage: Object.assign({}, state.user.errorMessage, {
                                confirmPassword: null,
                                password: null
                            })
                        })
                    })
                case 'dniFront':
                case 'dniBack':
                    if (!imageHasFormatValid(action.event.target.files[0])) {
                        return Object.assign({}, state, {
                            user: Object.assign({}, state.user, {
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    profile: Object.assign({}, state.user.errorMessage.profile, {
                                        [action.event.target.name]: 'El formato del archivo no es válido. Formatos válidos: jpg, jpeg, png'
                                    })
                                })
                            })
                        })
                    }
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            profile: Object.assign({}, state.user.profile, {
                                [action.event.target.name]: action.event.target.files[0],
                                [`${action.event.target.name}Preview`]: URL.createObjectURL(action.event.target.files[0]),
                                errorMessage: Object.assign({}, state.user.errorMessage, {
                                    profile: Object.assign({}, state.user.errorMessage.profile, {
                                        [action.event.target.name]: null
                                    })
                                })
                            })
                        })
                    })
                default:
                    return Object.assign({}, state, {
                        user: Object.assign({}, state.user, {
                            profile: Object.assign({}, state.user.profile, {
                                [action.event.target.name]: action.event.target.value
                            })
                        })
                    })

            }

        case profileActions.REQUEST_PROFILE_DATA_SUCCEDED:
            return Object.assign({}, state, {
                user: Object.assign({}, action.profile, {
                    token: state.user.token,
                    errorMessage: {
                        profile: {}
                    },
                    logged: true
                }),
                isFetching: false

            })

        case profileActions.REQUEST_PROFILE_DATA_FAILED:
            return Object.assign({}, state, {
                isFetching: false

            })

        case profileActions.REQUEST_UPDATE_PROFILE_IMG:
            return Object.assign({}, state, {
                fetchings: Object.assign({}, state.fetchings, {
                    profile: Object.assign({}, state.fetchings.profile, {
                        isFetchingImg: true
                    })
                })
            })

        case profileActions.REQUEST_UPDATE_PROFILE_IMG_SUCCEDED:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    profile: Object.assign({}, state.user.profile, {
                        selfie: action.user.profile.selfie
                    })
                }),
                fetchings: Object.assign({}, state.fetchings, {
                    profile: Object.assign({}, state.fetchings.profile, {
                        isFetchingImg: false
                    })
                })
            })

        case profileActions.REQUEST_UPDATE_PROFILE_IMG_FAILED:
            return Object.assign({}, state, {
                fetchings: Object.assign({}, state.fetchings, {
                    profile: Object.assign({}, state.fetchings.profile, {
                        isFetchingImg: false
                    })
                })
            })

        case profileActions.REQUEST_UPDATE_PROFILE_SUCCEDED:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    ...action.user
                }),
                fetchings: Object.assign({}, state.fetchings, {
                    profile: Object.assign({}, state.fetchings.profile, {
                        isFetchingBasic: false
                    })
                })
            })

        case profileActions.REQUEST_UPDATE_PROFILE_FAILED:
            return Object.assign({}, state, {
                fetchings: Object.assign({}, state.fetchings, {
                    profile: Object.assign({}, state.fetchings.profile, {
                        isFetchingBasic: false
                    })
                })
            })

        default:
            return state

    }

}

export default mainReducer;
