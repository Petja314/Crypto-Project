import {instanceAlternative, instanceAxios, instanceExchanger} from "./Api";


export const coinStatApi = {
    listOfCoinsApi(currency: string, rowsPerPage: number, page: number) {
        return instanceAxios.get(`?page=${page}&limit=${rowsPerPage}&currency=${currency}`)
    },
    coinDetails(id: string | undefined , currency : string) {
        return instanceAxios.get(`${id}?currency=${currency}`)
    },
    coinChart(id: string | undefined, period: string) {
        return instanceAxios.get(`${id}/charts?period=${period}`)
    },
};


export const alternativeApi = {
    fetchFearGreedIndex(){
        return instanceAlternative.get("/fng/?limit=31")
    }
}

export const exchangeCurrencyApi = {
    fetchCurrencyRate(currency : any) {
        return instanceExchanger.get(`/v1/latest?&currencies=${currency}`)
    }
}