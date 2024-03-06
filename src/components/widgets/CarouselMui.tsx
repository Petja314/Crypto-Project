import React, {useEffect, useState} from 'react';
import {Paper, Button, Box, Typography, Avatar} from '@mui/material'
import Carousel from "react-material-ui-carousel";
import {useSelector} from "react-redux";
import {RootState} from "../redux/ReduxStore";
import fire from "../../assets/images/icons/fire.png"
import redchart from "../../assets/images/icons/redchart.png"
import rocket from "../../assets/images/icons/rocket.png"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useNavigate} from "react-router-dom";

export const CarouselMui = () => {
    const {marketCapList, fetching} = useSelector((state: RootState) => state.marketCoinList)
    const [trendOfHour, setTrendOfHour] = useState<any>([])
    const [bestPerformanceDay, setBestPerformanceDay] = useState<any>([])
    const [worstPerformanceDay, setWorstPerformanceDay] = useState<any>([])

    useEffect(() => {
        if (!fetching) {
            const sortByPriceRange = (data: any, key: any) => data.sort((a: any, b: any) => a[key] - b[key])
            //HOUR
            const trendOfHour = sortByPriceRange([...marketCapList], 'priceChange1h').slice(-5).reverse(); // -5 === trendOfHour.length-5
            setTrendOfHour(trendOfHour)

            //BEST DAY PERFORMANCE
            const bestPerformanceDay = sortByPriceRange([...marketCapList], 'priceChange1d').slice(-5).reverse();
            setBestPerformanceDay(bestPerformanceDay)

            //WORST DAY PERFORMANCE
            const worstPerformanceDay = sortByPriceRange([...marketCapList], 'priceChange1d').slice(0, 5).reverse()
            setWorstPerformanceDay(worstPerformanceDay)
        }
    }, [fetching, marketCapList])


    return (
        <Carousel sx={{border: "2px solid #333", borderRadius: "12px",}}>
            <ItemRefactored data={trendOfHour} title="Trend of Hour" emojiIcon={fire} priceChangeKey="priceChange1h"/>
            <ItemRefactored data={bestPerformanceDay} title="Best Performers 24h" emojiIcon={rocket} priceChangeKey="priceChange1d"/>
            <ItemRefactored data={worstPerformanceDay} title="Worst Performers 24h" emojiIcon={redchart} priceChangeKey="priceChange1d"/>
        </Carousel>
    )
};
export default CarouselMui;

export const ItemRefactored = ({data, title, emojiIcon, priceChangeKey}: any) => {
    const navigate = useNavigate()
    const navigateToCoinDescription = (id : any) => {
        navigate(`/coin_info/${id}`)
    }

    console.log('data', data)
    return (
        <Paper sx={{height: '250px', paddingLeft: "50px", paddingRight: "50px"}}>
            <Typography mb={1} variant={'h6'}>
                <img style={{width: "30px", height: "30px"}} src={emojiIcon} alt="fire"/> {title}
            </Typography>
            {data.map((item: any, index: number) => (
                <Box
                    key={index}
                    sx={{display: "flex", justifyContent: "space-between",cursor : "pointer"}}
                    onClick={() => navigateToCoinDescription(item.id)}
                    >

                    <Box sx={{display: "flex", gap: 3, marginTop: "5px"}}>
                        <Box>{index + 1}</Box>
                        <Avatar sx={{width: "30px", height: "30px"}} src={item.icon}/>

                        <Box sx={{display: "flex"}}>
                            <Box sx={{fontWeight: "bold"}}>{item.name}</Box>
                            <Box sx={{color: "#c0c0ce", fontSize: "10px"}} component={"span"}> {item.symbol}</Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        color: priceChangeKey === "priceChange1h" ? "#16c784" : title === "Worst Performers 24h" ? "#ea3943" : "#16c784",
                        display: "flex", alignItems: "center",
                    }}>
                        {title === "Worst Performers 24h" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                        {item[priceChangeKey]}%
                    </Box>
                </Box>
            ))}
        </Paper>
    )
}









