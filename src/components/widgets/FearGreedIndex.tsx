import React, {memo, useEffect} from 'react';
import {Avatar, Box, Paper, Typography} from "@mui/material";
import fear_greed from "../../assets/images/image/FearandGreedChart.svg"
import bitcoin from "../../assets/images/icons/bitcoinimg.png"
import moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import {fearAndGreedFetchingThunk, fearGreedArray} from "../../redux/FearGreedIndexReducer";
import styles from "../../css/dashboard/fear-greed.module.css"

/**
 * Description: Fear and Greed Index Component
 * Displays the current fear and greed index in the cryptocurrency market,
 * along with historical values for the past day, week, and month. It provides a visual representation
 * of market sentiment using an index ranging from 0 to 100, where lower values indicate fear and higher
 * values indicate greed. Additionally, it includes a chart showing the trend of fear and greed over time.
 */
const FearGreedIndex = () => {
    const dispatch: AppDispatch = useDispatch()
    const {fetching} = useSelector((state: RootState) => state.marketCoinList)
    const {fearGreedIndexData, greedIndex} = useSelector((state: RootState) => state.fearAndGreed)

    // Dispatch to make an API call to fetch the latest fear and greed data from the market
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
    const normalizedAngle = normalizeAngleHandler(greedIndex)
    return (
        <Box>
            <Paper className={styles.paperFearGreed}>
                <Box className={styles.featGreedBoxContent}>
                    <Box p={2}>
                        <Box mb={2}>

                            <Box className={styles.fearGreedBoxInfo}>
                                <Avatar className={styles.fearGreedAvatar} src={bitcoin}/>
                                <Typography variant={'h6'}> Fear & Greed Index</Typography>
                            </Box>

                            <Box className={styles.fearGreenDefinition}>Multifactorial Crypto Market Sentiment Analysis</Box>
                        </Box>

                        <Box className={styles.fearGreenDataContent}>
                            <Box className={styles.fearGreenDataWrapper}>
                                {
                                    fearGreedIndexData.slice(0, 1).map((item: fearGreedArray, index: number) => (
                                        <Box key={index}>
                                            <Box className={styles.fearGreenChart} sx={{transform: `rotate(${normalizedAngle}deg)`, transformOrigin: "93.5px 8px"}}/>
                                            <img src={fear_greed} alt="feat_greed_image"/>

                                            <Box className={styles.fearGreedBoxValue}>
                                                <Box className={styles.fearGreedValue}>
                                                    {item.value}
                                                </Box>
                                                {item.value_classification}
                                            </Box>

                                            <Box className={styles.lastUpdate}>
                                                Last updated :{moment(item.timestamp * 1000).format('MMM DD YYYY h:mm A')}
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>
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

export default React.memo(FearGreedIndex);


type HistoricalValuesPropsType = {
    fearGreedIndexData: fearGreedArray[]
}
const HistoricalValuesGreedIndex = memo(({fearGreedIndexData}: HistoricalValuesPropsType) => {
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
        <Box p={2} className={styles.fearGreedValues}>
            <Typography variant={'h6'}>Historical Values</Typography>
            {
                filteredData.map((item: fearGreedArray, index: number) => (
                    <Box className={styles.historicalValuesWrapper} key={index}>
                        <Box>
                            <Box className={styles.historicalDate}>
                                {moment(item.timestamp * 1000).subtract('days').calendar()}
                            </Box>
                            <Box
                                className={styles.historicalClassValue}
                                sx={{color: getColorByValue(item.value)}}
                            >
                                {item.value_classification}
                            </Box>
                        </Box>
                        <Box className={styles.currentGreedValue} sx={{backgroundColor: getColorByValue(item.value),}}>
                            {item.value}
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
})