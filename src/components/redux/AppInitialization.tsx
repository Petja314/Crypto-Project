import React from 'react';
import {auth} from "../../config/firebase";
import {profileThunkCreator} from "./ProfileReducer";

const initialState : any = {
    isFetching: false,
    authUser : null
}
export const AppInitialization = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER_IS_AUTH" :
            return {
                ...state,
                authUser: action.authUser
            }
        case "SET_IS_FETCHING" :
            return {
                ...state,
                isFetching: action.isFetching
            }
        default :
            return state
    }
};

export const appInitActions = ({
    setUserAuth: (authUser: any) => ({
        type: "SET_USER_IS_AUTH",
        authUser
    } as const),
    setIsFetchingAC: (isFetching: any) => ({
        type: "SET_IS_FETCHING",
        isFetching
    } as const),
})

export const appInitializationThunkCreator = () =>  async (dispatch: any) => {
    //Calling the api to get authenticated user data
    const unsubscribe = await auth.onAuthStateChanged((user: any) => {
        if (user) {
            //Set authenticated current user
            dispatch(appInitActions.setUserAuth(user))
            //Set all user info into the profile
            dispatch(profileThunkCreator(user.displayName, user.email, user.emailVerified, user.photoURL, user.uid))
            //Initialize the app by isFetching state - true/false
            dispatch(appInitActions.setIsFetchingAC(true))
            return
        }
        dispatch(appInitActions.setUserAuth(null))
        dispatch(appInitActions.setIsFetchingAC(true))
        return () => unsubscribe
    })
}





