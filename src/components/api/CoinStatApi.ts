import {instanceAxios} from "./Api";


export const coinStatApi = {
    listOfCoinsApi(currency: string, rowsPerPage: number, page: number) {
        return instanceAxios.get(`?page=${page}&limit=${rowsPerPage}&currency=${currency}`)
    },
    coinDetails(id: any , currency : any) {
        return instanceAxios.get(`${id}?currency=${currency}`)
    },
    coinChart(id: any, period: any) {
        return instanceAxios.get(`${id}/charts?period=${period}`)
    },
};

