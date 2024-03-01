import React, {useEffect} from 'react';
import {coinMarketCapApi} from "../api/CointGeckoApi";
import axios from "axios";

const Nft = () => {

    const url = 'http://localhost:3001/v1/cryptocurrency/categories';

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('err', error);
            });
    }, []);


    return (
        <div>
            nft
        </div>
    )
};

export default Nft;