import {instance, instanceMarketCapAxios} from "./Api";

const apiKeyGecko = process.env.REACT_APP_API_KEY_CRYPTO_GECKO

export const coinGeckoApi = {
    checkApiStatus() {
        return instance('/ping')
    },
    listOfCoinsApi(currency : string , pageSize : number , page : number) {
        return instance(`coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`)
    },
    coinChart(id : any) {
        return instance(`coins/${id}/market_chart?vs_currency=usd&days=7`)
    },
    coinDetails(id : any) {
        return instance.get(`coins/${id}`)
    }
};


export const coinMarketCapApi = {
    categoriesMarketCap() {
        return instanceMarketCapAxios.get(`cryptocurrency/categories`)
    }
};

