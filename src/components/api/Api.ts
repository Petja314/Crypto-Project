import axios from "axios";

const apiKeyGecko = process.env.REACT_APP_API_KEY_CRYPTO_GECKO
const coinMarketCapKey = process.env.REACT_APP_API_KEY_COIN_MARKET_CAP


export const instance = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
    headers: {
        'x-cg-demo-api-key': apiKeyGecko,
    }
})

export const instanceMarketCapAxios = axios.create({
    withCredentials: true,
    baseURL: "https://pro-api.coinmarketcap.com/v1/",
    headers: {
        'X-CMC_PRO_API_KEY': coinMarketCapKey,
    }
})
