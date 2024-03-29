import React, {useEffect} from 'react';
import {Avatar, Box, Paper, Typography} from "@mui/material";
import fear_greed from "../../assets/images/image/FearandGreedChart.svg"
import bitcoin from "../../assets/images/icons/bitcoinimg.png"
import moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/ReduxStore";
import {fearAndGreedFetchingThunk, fearGreedArray} from "../redux/FearGreedIndexReducer";

const FearGreedIndex = () => {
    const dispatch: AppDispatch = useDispatch()
    const {fetching} = useSelector((state: RootState) => state.marketCoinList)
    const {fearGreedIndexData, greedIndex} = useSelector((state: RootState) => state.fearAndGreed)

    useEffect(() => {
        if (!fetching) {
            dispatch(fearAndGreedFetchingThunk())
        }
    }, [fetching])


    //Function that calculates middle point from 0 to 100
    const normalizeAngleHandler = (value: number) => {
        const maxValue = 100
        const minAngle = 0
        const maxAngle = 180
        const normalizedAngle = (value * (maxAngle - minAngle) / maxValue + minAngle)
        return normalizedAngle
    }
    const normalizedAngle: number = normalizeAngleHandler(greedIndex)

    return (
        <Box>
            <Paper sx={{borderRadius: "20px", marginBottom: "30px", height : "320px"}}>
                <Box sx={{display: "flex", justifyContent: "space-around"}}>
                    <Box p={2}>
                        <Box mb={2}>
                            <Box sx={{display: "flex", gap: 1, itemAlign: "center"}}>
                                <Avatar sx={{width: "30px", height: "30px"}} src={bitcoin}/>
                                <Typography variant={'h6'} sx={{fontWeight: "bold"}}> Fear & Greed Index</Typography>
                            </Box>
                            <Box sx={{color: "#c2baba", fontSize: "12px"}}>Multifactorial Crypto Market Sentiment Analysis</Box>
                        </Box>

                        <Box sx={{position: "relative",}}>
                            {
                                fearGreedIndexData.slice(0, 1).map((item: fearGreedArray, index: number) => (
                                    <Box key={index}>
                                        <Box sx={{
                                            height: "16px",
                                            width: "16px",
                                            borderRadius: "50%",
                                            border: "2px solid #FFFFFF",
                                            backgroundColor: "#0D1421",
                                            position: "absolute",
                                            top: "81px",
                                            left: "-5px",
                                            transform: `rotate(${normalizedAngle}deg)`,
                                            transformOrigin: "93.5px 8px"
                                        }}/>
                                        <img src={fear_greed} alt=""/>

                                        <Box sx={{textAlign: "center", position: "absolute", top: "45px", left: "30%"}}>
                                            <Box sx={{fontWeight: "bold", fontSize: "22px"}}>{item.value}</Box>
                                            {item.value_classification}
                                        </Box>

                                        <Box mt={9} sx={{color: "#c2baba", fontSize: "13px"}}>
                                            Last updated :{moment(item.timestamp * 1000).format('MMM DD YYYY h:mm A')}
                                        </Box>


                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                    {/*HISTORICAL VALUES*/}
                    <HistoricalValuesGreedIndex
                        fearGreedIndexData={fearGreedIndexData}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default FearGreedIndex;

type HistoricalValuesPropsType = {
    fearGreedIndexData: fearGreedArray[]
}
const HistoricalValuesGreedIndex = ({fearGreedIndexData}: HistoricalValuesPropsType) => {
    // Checking fearGreedIndexData if the data was fetched before initializing
    if (!fearGreedIndexData || fearGreedIndexData.length === 0) {
        return null
    }
    // Making an array to get the historical data by , day , week, month...
    const historicalValue: number[] = [0, 1, 14, 30]
    const filteredData = historicalValue.map(index => (fearGreedIndexData[index]))

    //Function that return the right color depends on the greed index value
    const getColorByValue = (value: number) => {
        if (value <= 20) return "rgb(234, 57, 67)";
        if (value <= 40) return "rgb(234, 140, 0)";
        if (value <= 60) return "rgb(243, 212, 47)";
        if (value <= 80) return "rgb(147, 217, 0)";
        if (value <= 100) return "rgb(22, 199, 132)";
        return "";
    }
    return (
        <Box p={2}>
            <Typography variant={'h6'} sx={{fontWeight: "bold", marginBottom: "10px"}}>Historical Values</Typography>
            {
                filteredData.map((item: fearGreedArray, index: number) => (
                    <Box key={index} sx={{display: "flex", justifyContent: "space-between", gap: 5, borderBottom: "1px solid #ccc", marginBottom: "5px", paddingBottom: "5px"}}>
                        <Box>
                            <Box sx={{color: "#ccc", fontSize: "14px"}}> {moment(item.timestamp * 1000).subtract('days').calendar()} </Box>
                            <Box sx={{
                                color: getColorByValue(item.value),
                                fontWeight: "bold"
                            }}>
                                {item.value_classification}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: getColorByValue(item.value),
                                padding: "10px",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            {item.value}
                        </Box>

                    </Box>
                ))
            }
        </Box>
    )
}