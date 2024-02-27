import React, {useState} from 'react';
import {auth, db, googleProvider, storage} from "../../config/firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";



const initialState: any = {
    user : [],
    newImage : null ,
    urlDisplayImage : null
}
export const ProfileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER" :
            return {
                ...state,
                user: [...state.user, ...action.user],
            }
        case "SET_NEW_IMAGE" :
            return {
                ...state,
                user : state.user.map((item : any , index : any) => {
                    if ( index === 0 ) {
                        return {
                            ...item ,
                            photoURL: action.photoURL
                        }
                    }
                    return item
                })
            }
        default :
            return state
    }
};

// export type ActionsAuthType = InferActionsTypes<typeof actionsProfile>
export const actionsProfile = {
    setUserDataAC: (user: any) => ({
        type: "SET_USER",
        user,
    } as const),
    setNewImgAC: (photoURL: any) => ({
        type: "SET_NEW_IMAGE",
        photoURL
    } as const),

}

export const profileThunkCreator = (displayName: any, email: any, emailVerified: any, photoURL: any, uid: any) => async (dispatch: any) => {
    const users = []
    const newObj = {displayName: displayName, email: email, emailVerified: emailVerified, photoURL: photoURL, uid: uid}
    users.push(newObj)
    if (users.length > 0) {
        await dispatch(actionsProfile.setUserDataAC(users))
    } else {
        console.error('users are empty')
    }
}

export const updateAvatarStorageFBThunk = (newImage: any) => (dispatch: any,getState : any) => {

}