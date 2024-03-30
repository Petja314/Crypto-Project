import axios, {AxiosInstance} from "axios";
import {AxiosResponse} from "axios/index";


/**
 * Coin Stat API
 * Features:
 *     Retrieve data about the crypto market, including:
 *   - List of all coins from market cap
 *   - Specific coin details with selected currency
 *   - Chart data of a specific coin to display in JSX with the ability to change it by period of time
 *   - Cryptocurrency news with specific types such as bullish, trending, latest, etc.
 */

const API_KEY = process.env.REACT_APP_API_COIN_STAT_KEY as string

const instanceAxios: AxiosInstance  = axios.create({
    baseURL: "https://openapiv1.coinstats.app/",
    headers: {
        'X-API-KEY': API_KEY
    }
})

export const coinStatAPI = {
    listOfCoinsApi(currency: string, rowsPerPage: number, page: number):  Promise<AxiosResponse> {
        return instanceAxios.get(`coins/?page=${page}&limit=${rowsPerPage}&currency=${currency}`)
    },
    coinDetails(id: string | undefined , currency : string): Promise<AxiosResponse> {
        return instanceAxios.get(`coins/${id}?currency=${currency}`)
    },
    coinChart(id: string | undefined, period: string): Promise<AxiosResponse> {
        return instanceAxios.get(`coins/${id}/charts?period=${period}`)
    },
    cryptoNews(type : string , page : number , limit : number): Promise<AxiosResponse> {
        return instanceAxios.get(`/news/type/${type}?page=${page}&limit=${limit}`)
    }
}



