import {instanceAxios} from "./Api";


export const coinStatApi = {
    listOfCoinsApi(currency: string, pageSize: number, page: number) {
        return instanceAxios.get(`?page=${page}&limit=${pageSize}&currency=${currency}`)
    },
    coinDetails(id: any) {
        return instanceAxios.get(`${id}?currency=usd`)
    },
    coinChart(id: any, period: any) {
        return instanceAxios.get(`${id}/charts?period=${period}`)
    },
};

