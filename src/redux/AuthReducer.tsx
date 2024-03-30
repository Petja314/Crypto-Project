import React from 'react';
import {auth, googleProvider} from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import {InferActionsTypes, RootState} from "./ReduxStore";
import {ThunkAction} from "redux-thunk";
import {appInitActions} from "./AppInitialization";


export type AuthInitialStateType = {
    tempEmailValue: string,
    password: string,
    isRegistered: boolean,
    loginError: string,
    signInError: string,
}

const initialState: AuthInitialStateType = {
    tempEmailValue: "",
    password: "",
    isRegistered: true,
    loginError: '',
    signInError: '',
}
export const AuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_EMAIL" :
            return {
                ...state,
                tempEmailValue: action.email
            }
        case "SET_PASSWORD" :
            return {
                ...state,
                password: action.password
            }
        case "SET_LOGIN_ERROR" :
            return {
                ...state,
                loginError: action.error
            }
        case "SET_SIGN_IN_ERROR" :
            return {
                ...state,
                signInError: action.error
            }
        default :
            return state
    }
};


type ActionsAuthType = InferActionsTypes<typeof actionsAuth>

export const actionsAuth = {
    setEmailAC: (tempEmail: string) => ({
        type: "SET_EMAIL",
        email: tempEmail
    } as const),
    setPasswordAC: (password: string) => ({
        type: "SET_PASSWORD",
        password
    } as const),
    setLoginErrorAC: (error: string) => ({
        type: "SET_LOGIN_ERROR",
        error
    } as const),
    setSignInErrorAC: (error: string) => ({
        type: "SET_SIGN_IN_ERROR",
        error
    } as const),
}


// type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsInitializeApp | any>;

export const loginThunkCreator = () => async (dispatch: any, getState: any) => {
    const {tempEmailValue, password} = getState().auth
    try {
        // loginUser - Handles the login process by sending user details to the server for authentication
        await signInWithEmailAndPassword(auth, tempEmailValue, password)
    } catch (error: any) {
        const errorCode = error.code;
        if (errorCode) {
            dispatch(actionsAuth.setLoginErrorAC(errorCode))
        }
    }
}

export const signInWithGoogleThunkCreator = () => async (dispatch: any) => {
    try {
        // If signing in with Google, there's no need to register with username, password, etc. Google handles user registration.
        // If we are already was registered with Google, it will direct us to existing account
         await signInWithPopup(auth, googleProvider)
    } catch (error: any) {
        const errorCode = error.code;
        if (errorCode) {
            dispatch(actionsAuth.setLoginErrorAC(errorCode))
        }
    }
}

export const logOuThunkCreator = () => async (dispatch: any) => {
    try {
        //Sign out from current account
        await signOut(auth)
    } catch (error: any) {
        const errorCode = error.code;
        if (errorCode) {
            dispatch(actionsAuth.setLoginErrorAC(errorCode))
        }
    }
}


export const signInThunkCreator = (userName: string) => async (dispatch: any, getState: any) => {
    //Creating the new account
    const {tempEmailValue, password} = getState().auth
    try {
        //Sending the req. details to the server
        const userCredentials = await createUserWithEmailAndPassword(auth, tempEmailValue, password)
        // Creating a new username by updating the user profile using the updateProfile API call.
        // CreateUserWithEmailAndPassword does not support adding usernames and other fields.
        await updateProfile(userCredentials.user, {displayName: userName})
    } catch (error: any) {
        const errorCode = error.code;
        if (errorCode) {
            dispatch(actionsAuth.setSignInErrorAC(errorCode))
        }
    }
}