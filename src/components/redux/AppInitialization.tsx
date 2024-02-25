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

// export const appInitializationThunkCreator = () =>  async (dispatch: any) => {
//     const unsubscribe = await auth.onAuthStateChanged((user: any) => {
//         if (user) {
//             console.log('in')
//             dispatch(appInitActions.setUserAuth(user))
//             dispatch(appInitActions.setIsFetchingAC(false))
//             return
//         }
//         console.log('out')
//         dispatch(appInitActions.setUserAuth(null))
//         dispatch(appInitActions.setIsFetchingAC(false))
//         return () => unsubscribe
//     })
// }





