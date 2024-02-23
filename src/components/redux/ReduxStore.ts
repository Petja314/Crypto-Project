// import {applyMiddleware, combineReducers, compose, createStore} from "redux";
// import thunkMiddleware from 'redux-thunk';
// import {AuthReducer} from "./AuthReducer";
//
// export type RootState = ReturnType<typeof rootReducers>
// let rootReducers = combineReducers({
//     auth : AuthReducer
//
// });
//
// type PropertiesType<T> = T extends {[key : string] : infer U} ? U : never
// export type InferActionsTypes <T extends {[key : string] : (...args : any[])=> any}> = ReturnType<PropertiesType<T>>
//
// //@ts-ignore
// // That is for REDUX DEV TOOL CHROME EXTENSION
// // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// // const store = createStore(rootReducers, composeEnhancers( applyMiddleware(thunkMiddleware)))
//
// // --------------------------------------------------------------------------------------------------------
//
// // That is just basic creation of our store
// let store = createStore(rootReducers,applyMiddleware(thunkMiddleware));
// // @ts-ignore
// window.store = store
//
// export default store;


import {configureStore} from '@reduxjs/toolkit';
import { AuthReducer } from "./AuthReducer";
import {thunk} from "redux-thunk";
import {AppInitialization} from "./AppInitialization";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        appInitial : AppInitialization

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// import { configureStore } from '@reduxjs/toolkit'
// import {AuthReducer} from "./AuthReducer";
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const store = configureStore({
//     reducer: {
//         auth : AuthReducer
//     }
// })
//
//
//
// type PropertiesType<T> = T extends {[key : string] : infer U} ? U : never
// export type InferActionsTypes <T extends {[key : string] : (...args : any[])=> any}> = ReturnType<PropertiesType<T>>

