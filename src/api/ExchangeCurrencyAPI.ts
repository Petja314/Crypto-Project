import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {AxiosResponse} from "axios/index";

/**
 * Exchange Currency API
 * Features:
 * - Retrieve the latest exchange rates for selected currencies.
 */

const API_KEY = process.env.REACT_APP_API_EXCHANGE_CURRENCY_KEY as string

export const instanceExchanger : AxiosInstance  = axios.create({
    baseURL : "https://api.freecurrencyapi.com/",
    headers : {
        "apikey" : API_KEY
    }
})

export const exchangeCurrencyApi = {
    fetchCurrencyRate(currency : string[]) : Promise<AxiosResponse<CurrencyApiResponse>> {
        return instanceExchanger.get(`/v1/latest?&currencies=${currency}`)
    }
}

/** Typescript API response */
export interface ApiResponse<Data, Headers, Config, Request> {
    data: Data;
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
    request: Request;
}

export interface CurrencyData {
    [currencyCode: string]: number;
}

export interface CurrencyApiResponse extends ApiResponse<CurrencyData, Record<string, string>, AxiosRequestConfig, any> {}


