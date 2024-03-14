import axios from "axios";

const coinStatApiKey = process.env.REACT_APP_API_KEY_COIN_STAT


export const instanceAxios = axios.create({
    baseURL: "https://openapiv1.coinstats.app/coins/",
    headers: {
        'X-API-KEY': "07GRzrjRyWN31Ziw/90JsbuhxNL0+OilusCU1pMKpSg=",
    }
})


export const instanceAlternative = axios.create({
    baseURL  : "https://api.alternative.me/" ,
})


export const instanceExchanger = axios.create({
    baseURL : "https://api.freecurrencyapi.com/",
    headers : {
        "apikey" : "fca_live_HiwSZiRj0cuAwjzOuK41YJR5DXK9uUAn4iwMJDsA"
    }
})
