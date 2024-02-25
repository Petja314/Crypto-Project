import React, {useState} from 'react';
import {auth, db, googleProvider} from "../../config/firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";


const initialState: any = {
    // userName : "",
    // userEmail : "",
    // emailVerified : false,
    // userPhoto : "",
    user : [],
    // userId : null
}
export const ProfileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER" :
            return {
                ...state,
                user : [ ...state.user, ...action.user],
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
}

export const profileThunkCreator = (displayName : any,email : any,emailVerified : any ,  photoURL : any, uid : any) => async (dispatch: any) =>  {
    const users = []
    const newObj = { displayName : displayName ,email : email, emailVerified : emailVerified ,  photoURL : photoURL , uid : uid  }
    users.push(newObj)
    if ( users.length > 0 ) {
        await dispatch(actionsProfile.setUserDataAC(users))
    }
    else{
        console.error('users are empty')
    }
}

