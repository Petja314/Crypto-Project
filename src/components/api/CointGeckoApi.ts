import {instance} from "./Api";

const apiKeyGecko = process.env.REACT_APP_API_KEY_CRYPTO_GECKO


export const coinGeckoApi = {
    checkApiStatus() {
        return instance('https://api.coingecko.com/api/v3', {
            'x-cg-demo-api-key': apiKeyGecko,
        }).get('/ping');
    },
    listOfCoinsApi(currency : string , pageSize : number , page : number) {
        return instance('https://api.coingecko.com/api/v3' ,{
            'x-cg-demo-api-key': apiKeyGecko,
        }).get(`/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`)
    },
    coinChart(id : any) {
        return instance('https://api.coingecko.com/api/v3' ,{
            'x-cg-demo-api-key': apiKeyGecko,
        }).get(`/coins/${id}/market_chart?vs_currency=usd&days=7`)
    },


};
// 'x-cg-demo-api-key': apiKeyGecko,


// listOfCoinsApi(currency : string , pageSize : number , page : number) {
//     return instance('https://api.coingecko.com/api/v3').get(`/coins/markets?`, {
//         params : {
//             vs_currency : currency,
//             per_page : pageSize,
//             page : page,
//             'x-cg-demo-api-key': apiKeyGecko,
//         }
//     })}