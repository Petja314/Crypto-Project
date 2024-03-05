import React, {useState} from 'react';
import {coinStatApi} from "../api/CoinStatApi";
import _ from "lodash";
import usd from "../../assets/images/icons/currency_icons/USD.svg";
import {InferActionsTypes, RootState} from "./ReduxStore";
import {actionsProfile, ActionsProfileTypes} from "./ProfileReducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";


export type marketCapListArray = {
    "id": string,
    "icon": string,
    "name": string,
    "symbol": string,
    "rank": number,
    "price": number,
    "priceBtc": number,
    "volume": number,
    "marketCap": number,
    "availableSupply": number,
    "totalSupply": number,
    "priceChange1h": number,
    "priceChange1d": number,
    "priceChange1w": number,
    "redditUrl": string,
    "websiteUrl": string,
    "twitterUrl": string,
    "explorers": [string],
    [key : string] : any,
}
export type changeCurrencyValue = {
    value?: string,
    symbol?: string,
    icon?: string
}

type initialStateType = {
    marketCapList: marketCapListArray[],
    coinValue: string,
    currencyValue: changeCurrencyValue,
    rowsPerPage : number ,
    rows : number[],
    fetching : boolean,
    page : number
}

const initialState: initialStateType = {
    marketCapList: [],
    coinValue: '',
    currencyValue: {value: 'USD', symbol: "$", icon: usd},
    rowsPerPage : 25 ,
    rows : [25, 50, 100],
    fetching : true,
    page : 1
}




export const CryptoTableReducer = (state = initialState, action: ActionsCryptoTable) => {
    switch (action.type) {
        case "SET_ALL_COINS_LIST":
            return {
                ...state,
                marketCapList: [...state.marketCapList, ...action.data]
            }
        case "CLEAR_RECENT_API_CALL_DATA" :
            return {
                ...state,
                marketCapList: []
            }
        case "SET_COIN_VALUE" :
            return {
                ...state,
                coinValue: action.coinSearchValue
            }
            case "SET_CURRENCY_VALUE" :
            return {
                ...state,
                currencyValue: action.currency
            }
        case "SET_ROW_NUMBER" :
            return {
                ...state,
                fetching: action.isFetching,
                rowsPerPage: action.selectedRowValue,
                page : action.page
            }
            case "SET_FETCHING" :
            return {
                ...state,
                fetching: action.isFetching
            }
            case "SET_PAGE" :
            return {
                ...state,
                page: action.page
            }
        default :
            return state
    }
};

export type ActionsCryptoTable = InferActionsTypes<typeof actionsCryptoTable>
export const actionsCryptoTable = {
    setAllCoinsListAC: (data: marketCapListArray[]) => ({
        type: "SET_ALL_COINS_LIST",
        data
    } as const),
    clearRecentApiCallDataValue: () => ({
        type: "CLEAR_RECENT_API_CALL_DATA",
    } as const),
    setCoinSearchValueAC: (coinSearchValue: string) => ({
        type: "SET_COIN_VALUE",
        coinSearchValue
    } as const),
    setCurrencyValueAC: (currency: any) => ({
        type: "SET_CURRENCY_VALUE",
        currency
    } as const),
    setRowNumberAC: (isFetching : boolean ,selectedRowValue: number , page : number) => ({
        type: "SET_ROW_NUMBER",
        isFetching ,
        selectedRowValue,
        page
    } as const),
    setFetchingAC: (isFetching: boolean) => ({
        type: "SET_FETCHING",
        isFetching
    } as const),
    setPageAC: (page: number) => ({
        type: "SET_PAGE",
        page
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsCryptoTable | any>;

export const getAllCoinsListThunk = (currency: string, rowsPerPage: number, page: number) : ThunkType => async (dispatch) => {
    try {
        const response = await coinStatApi.listOfCoinsApi(currency, rowsPerPage, page)
        if (response?.status === 200) {
            dispatch(actionsCryptoTable.setAllCoinsListAC(response.data.result))
        }
    } catch (error) {
        console.error(error)
    }
}

export const handlingTableByRowNumbersThunk = (isFetching : boolean, selectedRowValue : number,page : number) => (dispatch :ThunkDispatch<RootState,unknown,any>) => {
    dispatch(actionsCryptoTable.setRowNumberAC(isFetching, selectedRowValue , page))
    dispatch(actionsCryptoTable.clearRecentApiCallDataValue()); //clearing recent data to avoid duplicates
}


//LOCAL STORAGE LOGIC - SOMETIMES API GIVING THE 429 ERROR (TOO MANY REQUEST BECAUSE OF THE DEMO ACCOUNT)
// export const getAllCoinsListThunk = (currency: string, pageSize: number, page: number) => async (dispatch: any) => {
//     // Check the last fetched page from local storage
//     const lastFetchedPage = localStorage.getItem("lastFetchedPage");
//
//     // If the current page is less than or equal to the last fetched page, dispatch the data from local storage
//     if (lastFetchedPage && page <= parseInt(lastFetchedPage)) {
//         console.log('dispatching from LS');
//         const localStorageCoinList = localStorage.getItem("marketCapListLS");
//         const existingData = JSON.parse(localStorageCoinList || '[]');
//         dispatch(actionsCryptoTable.setAllCoinsListAC(existingData));
//     } else {
//         // If the current page is greater than the last fetched page, fetch new data
//         try {
//             const response = await coinGeckoApi.listOfCoinsApi(currency, pageSize, page);
//             if (response.status === 200) {
//                 // Retrieve existing data from local storage
//                 const localStorageCoinList = localStorage.getItem("marketCapListLS");
//                 const existingData = JSON.parse(localStorageCoinList || '[]');
//
//                 // Merge existing data with new data
//                 const newData = [...existingData, ...response.data];
//
//                 // Update local storage with merged data and last fetched page
//                 console.log('updating LS');
//                 localStorage.setItem("marketCapListLS", JSON.stringify(newData));
//                 localStorage.setItem("lastFetchedPage", page.toString());
//
//                 // Dispatch the merged data
//                 dispatch(actionsCryptoTable.setAllCoinsListAC(newData));
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }
// };





