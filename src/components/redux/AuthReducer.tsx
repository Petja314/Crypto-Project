import React, {useState} from 'react';
import {auth, db, googleProvider} from "../../config/firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {profileThunkCreator} from "./ProfileReducer";


const initialState: any = {
    tempEmailValue: "",
    password: "",
    isRegistered: true,
    usersDb: [],
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

// export type ActionsAuthType = InferActionsTypes<typeof actionsAuth>

export const actionsAuth = {
    setEmailAC: (tempEmail: any) => ({
        type: "SET_EMAIL",
        email: tempEmail
    } as const),
    setPasswordAC: (password: any) => ({
        type: "SET_PASSWORD",
        password
    } as const),
    setLoginErrorAC: (error: any) => ({
        type: "SET_LOGIN_ERROR",
        error
    } as const),
    setSignInErrorAC: (error: any) => ({
        type: "SET_SIGN_IN_ERROR",
        error
    } as const),
}


export const loginThunkCreator = () => async (dispatch: any, getState: any) => {
    const {tempEmailValue, password} = getState().auth
    try {
        let response = await signInWithEmailAndPassword(auth, tempEmailValue, password)
        // console.log('response' , response)
    } catch (error: any) {
        const errorCode = error.code;
        if (errorCode) {

            dispatch(actionsAuth.setLoginErrorAC(errorCode))
        }
    }
}

export const signInWithGoogleThunkCreator = () => async (dispatch: any) => {
    try {
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
        await signOut(auth)
    } catch (error: any) {
        const errorCode = error.code;
        if (errorCode) {
            dispatch(actionsAuth.setLoginErrorAC(errorCode))
        }
    }
}


export const signInThunkCreator = (userName: any) => async (dispatch: any, getState: any) => {
    const {tempEmailValue, password} = getState().auth
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, tempEmailValue, password)
        await updateProfile(userCredentials.user, {displayName: userName})
    } catch (error: any) {
        const errorCode = error.code;
        console.log('errorCode', errorCode)
        console.log('error', error)
        if (errorCode) {
            dispatch(actionsAuth.setSignInErrorAC(errorCode))
        }
    }
}