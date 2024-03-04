import React from 'react';
import { coinStatApi} from "../api/CoinStatApi";

const initialState = {
    coinData: [],
    cryptoChartData: []
}
export const CoinDescriptionReducer = (state = initialState, action: any) => {
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
        default :
            return state
    }
};


export const coinDescriptionActions = {
    setCoinDetails: (data: any) => ({
        type: "SET_COIN_DATA",
        data
    } as const),
    setCryptoChartAC: (cryptoChartData: any) => ({
        type: "SET_CRYPTO_CHART",
        cryptoChartData
    } as const),
}


export const coinDescriptionDataThunk = (id: any) => async (dispatch: any) => {
    try {
        const response = await coinStatApi.coinDetails(id);
        dispatch(coinDescriptionActions.setCoinDetails([response.data]))
    } catch (error) {
        console.log('Error:', error);
    }




}


export const coinChartDataThunk = (id: any) => async (dispatch: any) => {
    try {
        const response = await coinStatApi.coinChart(id);
        console.log('res chart :' , response)
        // dispatch(coinDescriptionActions.setCryptoChartAC())
        dispatch(coinDescriptionActions.setCryptoChartAC(response.data))
    } catch (error) {
        console.log('Error:', error);
    }

}