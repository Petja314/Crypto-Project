import axios, {AxiosInstance,AxiosResponse} from "axios";


/**
 * Alternative API
 * Features:
 * - Retrieve data from the open API platform regarding the current Fear and Greed Index (ranging from 0 to 100).
 */

const instanceAlternative : AxiosInstance  = axios.create({
    baseURL  : "https://api.alternative.me/" ,
})

export const alternativeApi = {
    fetchFearGreedIndex() : Promise<AxiosResponse>{
        return instanceAlternative.get("/fng/?limit=31")
    }
}
