import React from 'react';
import {coinGeckoApi} from "../api/CointGeckoApi";

const initialState = {
    marketCapList: []
}
export const CryptoTableReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_ALL_COINS_LIST":
            return {
                ...state,
                // marketCapList: [...state.marketCapList , ...action.data]
                marketCapList: action.data
            }
        default :
            return state
    }
};


export const actionsCryptoTable = {
    setAllCoinsListAC: (data: any) => ({
        type: "SET_ALL_COINS_LIST",
        data
    } as const),
}


// export const getAllCoinsListThunk = (currency: string, pageSize: number, page: number) => async (dispatch: any) => {
//     // Dispatching from Local Storage is data exist
//     const localStorageCoinList = localStorage.getItem("marketCapListLS")
//     if (localStorageCoinList) {
//         console.log('dispatching from LS')
//         let coinListParsed = JSON.parse(localStorageCoinList)
//         dispatch(actionsCryptoTable.setAllCoinsListAC(coinListParsed))
//         return; // Exit since we've dispatched from local storage
//     }
//
//     // Making a new Local Storage if data does not exist in LS
//     try {
//         const response = await coinGeckoApi.listOfCoinsApi(currency, pageSize, page)
//         if (response.status === 200) {
//             console.log('creating LS')
//             localStorage.setItem("marketCapListLS", JSON.stringify(response.data))
//             dispatch(actionsCryptoTable.setAllCoinsListAC(response.data))
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }



//LOCAL STORAGE LOGIC - SOMETIMES API GIVING THE 429 ERROR (TOO MANY REQUEST BECAUSE OF THE DEMO ACCOUNT)

export const getAllCoinsListThunk = (currency: string, pageSize: number, page: number) => async (dispatch: any) => {
    // Check the last fetched page from local storage
    const lastFetchedPage = localStorage.getItem("lastFetchedPage");

    // If the current page is less than or equal to the last fetched page, dispatch the data from local storage
    if (lastFetchedPage && page <= parseInt(lastFetchedPage)) {
        console.log('dispatching from LS');
        const localStorageCoinList = localStorage.getItem("marketCapListLS");
        const existingData = JSON.parse(localStorageCoinList || '[]');
        dispatch(actionsCryptoTable.setAllCoinsListAC(existingData));
    } else {
        // If the current page is greater than the last fetched page, fetch new data
        try {
            const response = await coinGeckoApi.listOfCoinsApi(currency, pageSize, page);
            if (response.status === 200) {
                // Retrieve existing data from local storage
                const localStorageCoinList = localStorage.getItem("marketCapListLS");
                const existingData = JSON.parse(localStorageCoinList || '[]');

                // Merge existing data with new data
                const newData = [...existingData, ...response.data];

                // Update local storage with merged data and last fetched page
                console.log('updating LS');
                localStorage.setItem("marketCapListLS", JSON.stringify(newData));
                localStorage.setItem("lastFetchedPage", page.toString());

                // Dispatch the merged data
                dispatch(actionsCryptoTable.setAllCoinsListAC(newData));
            }
        } catch (error) {
            console.error(error);
        }
    }
};


// export const getAllCoinsListThunk = (currency: string, pageSize: number, page: number) => async (dispatch: any) => {
//     try {
//         const response = await coinGeckoApi.listOfCoinsApi(currency, pageSize, page)
//         if (response.status === 200) {
//             dispatch(actionsCryptoTable.setAllCoinsListAC(response.data))
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }



