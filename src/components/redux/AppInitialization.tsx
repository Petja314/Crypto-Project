import React from 'react';
import {auth} from "../../config/firebase";

const initialState : any = {
    isFetching: true,
    userLogged: null
}
export const AppInitialization = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER_IS_AUTH" :
            return {
                ...state,
                userLogged: action.user
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
    setUserAuth: (user: any) => ({
        type: "SET_USER_IS_AUTH",
        user
    } as const),
    setIsFetchingAC: (isFetching: any) => ({
        type: "SET_IS_FETCHING",
        isFetching
    } as const),
})

export const appInitializationThunkCreator = () =>  async (dispatch: any) => {
    const unsubscribe = await auth.onAuthStateChanged((user: any) => {
        if (user) {
            console.log('in')
            // debugger
            dispatch(appInitActions.setUserAuth(user))
            // dispatch(appInitActions.setIsFetchingAC(false))
            // setUserLogged(user)
            // setIsFetching(false)
            // dispatch(appInitializationThunkCreator(user))
            return
        }
        console.log('out')
        // setUserLogged(null)
        // setIsFetching(false)
        dispatch(appInitActions.setUserAuth(null))
        // dispatch(appInitActions.setIsFetchingAC(false))
        return () => unsubscribe
    })
}

// export const appInitializationThunkCreator = () => async (dispatch: any) => {
//     try {
//         dispatch(appInitActions.setIsFetchingAC(true));
//
//         const user = await new Promise((resolve) => {
//             const unsubscribe = auth.onAuthStateChanged((user: any) => {
//                 resolve(user);
//                 unsubscribe(); // Unsubscribe after getting the initial user state
//             });
//         });
//
//         if (user) {
//             dispatch(appInitActions.setUserAuth(user));
//         } else {
//             dispatch(appInitActions.setUserAuth(null));
//         }
//
//         dispatch(appInitActions.setIsFetchingAC(false));
//     } catch (error) {
//         console.error('Error during app initialization:', error);
//         dispatch(appInitActions.setIsFetchingAC(false));
//     }
// };




