import React, { useMemo, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as profileActions from '../actions/profile'
import { useAlert } from './alertContext';
import { User, Profile } from '../models/index';
import { areUpdateProfileValid, areChanginPassValid } from '../actions/validations';

const ProfileContext = React.createContext(null);

// Provider for main components inside tree.

export const ProfileProvider = (props?: any) => {

    // Get data from redux state

    const { isFetching, fetchings } = useSelector((state: any) => state.main);

    let { isFetchingImg, isFetchingBasic } = fetchings.profile;

    // Get control for snackbar messages.

    const { alertElement } = useAlert();

    // Get control for dispatch actions for state redux update.

    const dispatch = useDispatch();

    const value = useMemo(() => {

        const validToChangePass = (user: User) => {
            return areChanginPassValid(user);
        }

        const isValidForm = (user: Profile) => {
            return areUpdateProfileValid(user)
        }

        const getProfile = () => {
            dispatch(profileActions.fetchProfileData(alertElement));
        }

        const handleProfileInputChange = (event: any) => {
            dispatch(profileActions.handleProfileInputChange(event))
        }

        const updateProfile = (user: User, isChangingPass: boolean) => {
            dispatch(profileActions.fetchUpdateProfile(user, isChangingPass, alertElement));
        }

        const updateProfileImg = (event: any) => {
            dispatch(profileActions.fectchUpdateProfileImg(event, alertElement))
        }

        return ({
            getProfile,
            isFetching,
            handleProfileInputChange,
            updateProfile,
            updateProfileImg,
            isFetchingImg,
            isFetchingBasic,
            isValidForm,
            validToChangePass
        })

    }, [
        alertElement,
        isFetching,
        isFetchingImg,
        isFetchingBasic,
        dispatch
    ])

    return (
        <ProfileContext.Provider value={value} {...props} />
    )

}

// Hook for main component inside tree.

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('Context must to be accesible from parent.')
    }
    return context;
}