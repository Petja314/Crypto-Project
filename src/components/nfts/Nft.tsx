import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Avatar, Box, Button, Container, MenuItem, Select, TextField} from "@mui/material";
import usd from "../../assets/images/icons/currency_icons/USD.svg"
import gbp from "../../assets/images/icons/currency_icons/GBP.svg"
import eur from "../../assets/images/icons/currency_icons/EUR.svg"
import cad from "../../assets/images/icons/currency_icons/CAD.svg"
import aud from "../../assets/images/icons/currency_icons/AUD.svg"
import {formattedPrice} from "../../commons/formattedPrice";
import Preloader from "../../commons/preloader/Preloader";

const Nft = () => {
    const [currencyValue, setCurrencyValue] = useState<any>({value: 'USD', symbol: "$", icon: usd})
    const currency = [
        {value: 'USD', symbol: "$", icon: usd},
        {value: 'GBP', symbol: "£", icon: gbp},
        {value: 'EUR', symbol: "€", icon: eur},
        {value: 'AUD', symbol: "$", icon: cad},
        {value: 'CAD', symbol: "$", icon: aud},
    ]
    const [coinValue, setCoinValue] = useState('')
    const [data, setData] = useState(
        [
            {id: 'bitcoin', price: "1000", icon: 'https://static.coinstats.app/coins/1650455588819.png', name: 'Bitcoin', symbol: 'BTC', rank: 1},
            {id: 'ethereum', price: "12000", icon: 'https://static.coinstats.app/coins/1650455629727.png', name: 'Ethereum', symbol: 'ETH', rank: 2},
            {id: 'tether', price: "13000", icon: 'https://static.coinstats.app/coins/1650455771843.png', name: 'Tether', symbol: 'USDT', rank: 3},
            {id: 'tether', price: "14000", icon: 'https://static.coinstats.app/coins/1650455771843.png', name: 'Tether', symbol: 'USDT', rank: 4},
            {id: 'tether', price: "15000", icon: 'https://static.coinstats.app/coins/1650455771843.png', name: 'Tether', symbol: 'USDT', rank: 5},
            {id: 'tether', price: "16000", icon: 'https://static.coinstats.app/coins/1650455771843.png', name: 'Tether', symbol: 'USDT', rank: 6},
            {id: 'tether', price: "17000", icon: 'https://static.coinstats.app/coins/1650455771843.png', name: 'Tether', symbol: 'USDT', rank: 7},
            {id: 'tether', price: "18000", icon: 'https://static.coinstats.app/coins/1650455771843.png', name: 'Tether', symbol: 'USDT', rank: 8},
            {id: 'tether', price: "19000", icon: 'https://static.coinstats.app/coins/1650455771843.png', name: 'Tether', symbol: 'USDT', rank: 9},
            {id: 'tether', price: "20000", icon: 'https://static.coinstats.app/coins/1650455771843.png', name: 'Tether', symbol: 'USDT', rank: 10},
        ]
    )
    // const [row, setRow] = useState([10])
    const firstIndexPage = 0
    const lastIndexPage = data.length
    const [row, setRow] = useState(lastIndexPage)
    const rowCounts = [3, 5, 10]


    const changeCurrencyHandler = (event: any) => {
        const selectedValue = event.target?.value
        console.log('selectedValue' , selectedValue) //dispatch value to api
        const currencyFilter = currency.find(item => item.value === selectedValue)
        setCurrencyValue(currencyFilter)
    }

    const findCoinHandler = () => {
        const filteredData = data.filter((item) => item.name.toUpperCase().includes(coinValue.toUpperCase()))
        return filteredData
    }
    const filteredData = findCoinHandler()
    const currentData = filteredData.slice(firstIndexPage, row)
    return (
        <Container>
            {/*<Preloader/>*/}
            <Box sx={{border: "1px solid green", padding: "20px", borderRadius: "10px", marginTop: "20px", display: "flex", gap: 5}}>
                <Box sx={{gap: 2}}>
                    Search by name:
                    <TextField onChange={(event: any) => setCoinValue(event.target.value)} type={"text"}/>
                </Box>

                <Box>
                    Rows per page:
                    <Select
                        value={row}
                        label={'row'}
                        onChange={(event: any) => setRow(event.target?.value)}
                    >
                        {
                            rowCounts
                                .map((item: any) => (
                                    <MenuItem value={item}>
                                        {item}
                                    </MenuItem>
                                ))
                        }
                    </Select>
                </Box>


                <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                    <Avatar sx={{width: "30px", height: "30px"}} src={currencyValue.icon}/>
                    <Select
                        value={currencyValue.value}
                        onChange={changeCurrencyHandler}
                    >
                        {
                            currency.map((item: any, index: any) => (
                                <MenuItem key={index} value={item.value}>
                                    {item.value}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </Box>


            </Box>
            {
                filteredData.length <= 0 &&
                <Box sx={{color: "#fff"}}>No matching results found.</Box>
            }

            {
                currentData.map((item: any) => (
                    <Box sx={{border: "1px solid yellow", padding: "20px", borderRadius: "10px", marginTop: "20px", display: "flex", justifyContent: "space-evenly"}}>
                        <Avatar src={item.icon}/>
                        <Box>
                            <Box>Rank</Box>
                            {item.rank}</Box>
                        <Box>
                            <Box>Price</Box>
                            {formattedPrice(item.price) + currencyValue.symbol}</Box>
                        <Box>
                            <Box>name</Box>
                            {item.name}</Box>
                        <Box>
                            {item.id}</Box>
                        <Box>{item.symbol}</Box>
                    </Box>
                ))
            }

        </Container>
    )
};

export default Nft;