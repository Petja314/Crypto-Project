import axios from "axios";

const coinStatApiKey = process.env.REACT_APP_API_KEY_COIN_STAT


export const instanceAxios = axios.create({
    baseURL: "https://openapiv1.coinstats.app/coins/",
    headers: {
        'X-API-KEY': "07GRzrjRyWN31Ziw/90JsbuhxNL0+OilusCU1pMKpSg=",
    }
})