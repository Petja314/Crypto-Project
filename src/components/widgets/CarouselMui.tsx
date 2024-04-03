import React, {memo, useEffect, useState} from 'react';
import {Avatar, Box, Paper, Typography} from '@mui/material'
import Carousel from "react-material-ui-carousel";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";
import fire from "../../assets/images/icons/fire.png"
import redchart from "../../assets/images/icons/redchart.png"
import rocket from "../../assets/images/icons/rocket.png"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useNavigate} from "react-router-dom";
import {ListSkeleton} from "./ListSkeleton";
import skeletonStyles from "../../css/dashboard/skeleton-dashboard.module.css"
import styles from "../../css/dashboard/carousel-trend.module.css"
import {marketCapListArray} from "../../redux/CryptoTableReducer";

/**
 * CarouselMui Component displays a carousel of cryptocurrency performance statistics.
 * It includes sliders for the trend of the hour, best performers in the last 24 hours, and worst performers in the last 24 hours.
 * Each slider shows relevant cryptocurrency data such as name, symbol, and percentage change in price.
 */

export const CarouselMui = () => {
    const {marketCapList, fetching} = useSelector((state: RootState) => state.marketCoinList)
    const [trendOfHour, setTrendOfHour] = useState<marketCapListArray[]>([])
    const [bestPerformanceDay, setBestPerformanceDay] = useState<marketCapListArray[]>([])
    const [worstPerformanceDay, setWorstPerformanceDay] = useState<marketCapListArray[]>([])

    useEffect(() => {
        if (!fetching) {
            //Sorting the performance by price change
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
        <Carousel className={styles.carouselSliderWrapper}>
            <CoinStatSlider data={trendOfHour} title="Trend of Hour" emojiIcon={fire} priceChangeKey="priceChange1h"/>
            <CoinStatSlider data={bestPerformanceDay} title="Best Performers 24h" emojiIcon={rocket} priceChangeKey="priceChange1d"/>
            <CoinStatSlider data={worstPerformanceDay} title="Worst Performers 24h" emojiIcon={redchart} priceChangeKey="priceChange1d"/>
        </Carousel>
    )
}
export default React.memo(CarouselMui);

type CoinStatSliderPropsType = {
    data: marketCapListArray[],
    title: string,
    emojiIcon: string,
    priceChangeKey: string,
}

export const CoinStatSlider = memo(({data, title, emojiIcon, priceChangeKey}: CoinStatSliderPropsType) => {
        const {fetching} = useSelector((state: RootState) => state.marketCoinList)

        const navigate = useNavigate()
        const navigateToCoinDescription = (id: string) => {
            navigate(`/coin_info/${id}`)
        }

        return (
            <Box>
                {fetching ? (
                    <ListSkeleton
                        columns={1}
                        skeletonClass={skeletonStyles.skeletonFearGreed}
                        variant={"rectangular"}
                    />
                ) : (
                    <Paper className={styles.paperCarouselSlider}>
                        <Typography mb={1} variant={'h6'}>
                            <img className={styles.emojiIcon} src={emojiIcon} alt="emoji_icon"/>
                            {title}
                        </Typography>
                        {data.map((item, index: number) => (
                            <Box key={index} className={styles.sliderDataContentBox} onClick={() => navigateToCoinDescription(item.id)}>
                                <Box className={styles.sliderDataWrapper}>
                                    <Box>{index + 1}</Box>
                                    <Avatar className={styles.sliderCoinIcon} src={item.icon}/>
                                    <Box className={styles.sliderContentCoinAlign}>
                                        <Box className={styles.coinName}>
                                            {item.name}
                                        </Box>
                                        <Box className={styles.coinSymbol} component={"span"}>
                                            {item.symbol}
                                        </Box>
                                    </Box>
                                </Box>

                                <Box
                                    className={styles.priceChangeBox}
                                    sx={{color: priceChangeKey === "priceChange1h" ? "#16c784" : title === "Worst Performers 24h" ? "#ea3943" : "#16c784",}}
                                >
                                    {title === "Worst Performers 24h" ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                                    {item[priceChangeKey]}%
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                )
                }
            </Box>
        )
    }
)








