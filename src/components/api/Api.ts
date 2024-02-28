import axios from "axios";

// export const instance = ( baseURL : any,  ) => {
//     return axios.create({
//         baseURL,
//         headers : {
//             'Content-Type': 'application/json',
//         }
//     })
//
// }


export const instance = ( baseURL : any, headers : any ) => {
    return axios.create({
        baseURL,
        headers : {
            'Content-Type': 'application/json',
            ...headers
        }
    })

}