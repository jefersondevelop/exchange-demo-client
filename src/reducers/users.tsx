import * as usersActions from '../actions/users';

const initialState = {
    user: {},
    users: [],
    isFetching: false

};

const usersReducer = (state: any = initialState, action: any): Object => {

    switch (action.type) {


        case usersActions.REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true
            })

        case usersActions.REQUEST_USERS_SUCCEDED:
            return Object.assign({}, state, {
                users: action.users,
                isFetching: false
            })

        case usersActions.REQUEST_USERS_FAILED:
            return Object.assign({}, state, {
                isFetching: false
            })

        default:
            return state

    }

}

export default usersReducer;
