import {applyMiddleware, combineReducers, compose, configureStore, createStore, ThunkMiddleware} from '@reduxjs/toolkit';
import { AuthReducer } from "./AuthReducer";
import {thunk} from "redux-thunk";
import {AppInitialization} from "./AppInitialization";
import {ProfileReducer} from "./ProfileReducer";


// export const store = configureStore({
//     reducer: {
//         auth: AuthReducer,
//         appInitial : AppInitialization,
//         userProfile : ProfileReducer
//
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(thunk),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


export type RootState = ReturnType<typeof rootReducers>
let rootReducers = combineReducers({
    auth: AuthReducer,
    appInitial : AppInitialization,
    userProfile : ProfileReducer

});




type PropertiesType<T> = T extends {[key : string] : infer U} ? U : never
export type InferActionsTypes <T extends {[key : string] : (...args : any[])=> any}> = ReturnType<PropertiesType<T>>
//@ts-ignore
// That is for REDUX DEV TOOL CHROME EXTENSION
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers( applyMiddleware(thunk)))
export default store;