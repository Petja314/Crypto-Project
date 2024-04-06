import React from 'react';
import {coinStatAPI} from "../api/CoinStatAPI";
import {InferActionsTypes, RootState} from "./ReduxStore";
import {ThunkAction} from "redux-thunk";
import {AxiosResponse} from "axios";
import {exchangeCurrencyApi} from "../api/ExchangeCurrencyAPI";

export type CurrencyListArrType = "USD" | "GBP" | "EUR" | "CAD" | "AUD"
export type CurrentPortfolioBalanceWidgetTypes = {
    currencyValueBalance: string[],
    currency: CurrencyListArrType[],
    exchangingRate: number[] ,
    btcPrice: null  | number
}

const initialState: CurrentPortfolioBalanceWidgetTypes = {
    currencyValueBalance: ['USD'],
    currency: ["USD", "GBP", "EUR", "CAD", "AUD"],
    exchangingRate: [],
    btcPrice: null
}
const PortfolioBalanceWidgetReducer = (state = initialState, action: ActionsProfileBalanceWidget) => {
    switch (action.type) {
        case  "CURRENCY_VALUE_PORTFOLIO" :
            return {
                ...state,
                currencyValueBalance: action.currencyValueBalance
            }
        case  "SET_EXCHANGING_RATE" :
            return {
                ...state,
                exchangingRate: action.exchangingRate
            }
        case  "SET_BITCOIN_PRICE" :
            return {
                ...state,
                btcPrice: action.btcPrice
            }
        default :
            return state
    }
};


export type ActionsProfileBalanceWidget = InferActionsTypes<typeof portfolioBalanceWidgetActions>

export const portfolioBalanceWidgetActions = {
    balanceCurrencyValue: (currencyValueBalance: string[]) => ({
        type: "CURRENCY_VALUE_PORTFOLIO",
        currencyValueBalance
    } as const),
    setExchangingRate: (exchangingRate:  number[]) => ({
        type: "SET_EXCHANGING_RATE",
        exchangingRate
    } as const),
    setBtcPrice: (btcPrice: null | number  ) => ({
        type: "SET_BITCOIN_PRICE",
        btcPrice
    } as const),

}
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsProfileBalanceWidget | any>;

export const fetchExchangeApiThunk = (currencyValueBalance: string[]) : ThunkType => async (dispatch )  => {
    try {
        let response: AxiosResponse  = await exchangeCurrencyApi.fetchCurrencyRate(currencyValueBalance)
        const currentExchangeValue = Object.values(response.data.data) as number[]
        dispatch(portfolioBalanceWidgetActions.setExchangingRate(currentExchangeValue))
    }
    catch (error) {
        console.error(error)
    }
}

export const fetchCurrentBtcPriceThunk = ()  : ThunkType   => async (dispatch) => {
    try {
        //widget value is hardcoded to the bitcoin and initial currency USD
        const response = await coinStatAPI.coinDetails("bitcoin", "usd")
        // console.log('response :' , response.data.price)
        dispatch(portfolioBalanceWidgetActions.setBtcPrice(response.data.price))
    } catch (error) {
        console.error(error)
    }
}

export default PortfolioBalanceWidgetReducer;