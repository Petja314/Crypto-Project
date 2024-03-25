import React, {useState} from 'react';
import {coinStatApi} from "../api/CoinStatApi";
import {InferActionsTypes, RootState} from "./ReduxStore";
import {actionsCryptoTable} from "./CryptoTableReducer";
import {ThunkAction} from "redux-thunk";

export type coinDataArray = {
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
    "explorers": [string]
}

export type cryptoChartDataType = {
    cryptoChartData: any
}

type initialStateCoinType = {
    coinData: coinDataArray[],
    cryptoChartData: any,
    chartTimeFrame: string,
    isLoading : boolean
}

const initialState: initialStateCoinType = {
    coinData: [],
    cryptoChartData: [],
    chartTimeFrame: "1m",
    isLoading : false
}
export const CoinDescriptionReducer = (state = initialState, action: ActionsCryptoTable) => {
    switch (action.type) {
        case "SET_COIN_DATA" :
            return {
                ...state,
                coinData: action.data
            }
        case "SET_CRYPTO_CHART" :
            return {
                ...state,
                cryptoChartData: action.cryptoChartData
            }
        case "SET_CHART_TIME_FRAME" :
            return {
                ...state,
                chartTimeFrame: action.chartTimeFrame
            }
        case "IS_LOADING_COIN_DETAILS" :
            return {
                ...state,
                isLoading : action.isLoading
            }

        default :
            return state
    }
};


export type ActionsCryptoTable = InferActionsTypes<typeof coinDescriptionActions>

export const coinDescriptionActions = {
    setCoinDetails: (data: coinDataArray[]) => ({
        type: "SET_COIN_DATA",
        data
    } as const),
    setCryptoChartAC: (cryptoChartData: any) => ({
        type: "SET_CRYPTO_CHART",
        cryptoChartData
    } as const),
    setChartTimeFrameAC: (chartTimeFrame: string) => ({
        type: "SET_CHART_TIME_FRAME",
        chartTimeFrame
    } as const),
    isLoadingCoinDetailsAC: (isLoading: boolean) => ({
            type: "IS_LOADING_COIN_DETAILS",
            isLoading
        }as const)
}


type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsCryptoTable | any>;

export const coinDescriptionDataThunk = (id: string | undefined, currency: string): ThunkType => async (dispatch) => {
    try {
        const response = await coinStatApi.coinDetails(id, currency);
        dispatch(coinDescriptionActions.setCoinDetails([response.data]))
        dispatch(coinDescriptionActions.isLoadingCoinDetailsAC(true))
    } catch (error) {
        console.log('Error:', error);
    }
}


export const coinChartDataThunk = (id: string | undefined, chartTimeFrame: string): ThunkType => async (dispatch) => {
    try {
        const response = await coinStatApi.coinChart(id, chartTimeFrame);
        dispatch(coinDescriptionActions.setCryptoChartAC(response.data))
    } catch (error) {
        console.log('Error:', error);
    }

}