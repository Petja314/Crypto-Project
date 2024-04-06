import React, {useEffect, useState} from "react";
import {Box, Paper, Skeleton, Typography} from "@mui/material";
import {ReactComponent as LeaderIcon} from "../../assets/images/icons/icon-cup-dark.svg"
import {useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";
import {marketCapListArray} from "../../redux/CryptoTableReducer";
import {NavigateFunction, useNavigate} from "react-router-dom";
import skeletonStyles from "../../css/dashboard/skeleton-dashboard.module.css"
import {ListSkeleton} from "./ListSkeleton";
import styles from "../../css/dashboard/leader-boards.module.css"


/**
 * Description: Leaderboard Component
 * The Leaderboard component displays the top performers or leaders in the cryptocurrency market for the week.
 * It ranks cryptocurrencies based on their price change over the past week.
 * Users can click on a leaderboard entry to view more details about the respective cryptocurrency.
 */
const LeaderBoard = () => {
    const navigate: NavigateFunction = useNavigate()
    const {marketCapList, fetching} = useSelector((state: RootState) => state.marketCoinList)
    const [leadersOfWeek, setLeadersOfWeek] = useState<marketCapListArray[]>([])

    useEffect(() => {
        if (!fetching) {
            //Sorting the data by price change of 1 week
            const sortedData = [...marketCapList] //Making a copy of original array!
            sortedData.sort((a, b) => a.priceChange1w - b.priceChange1w)
            //Making the array of top 10 coins
            const top = sortedData.slice(sortedData.length - 10).reverse()
            setLeadersOfWeek(top)
        }
    }, [fetching, marketCapList])

    const navigateToCoinDescription = (id: string) => {
        //Navigate to the coin info component
        navigate(`/coin_info/${id}`)
    }
    return (
        <Box>
            <Typography variant='h6' className={styles.leaderBoardTitle}><LeaderIcon/>Leaderboard of the week</Typography>

            {leadersOfWeek.length <= 0 ? (
                <ListSkeleton
                    columns={10}
                    skeletonClass={skeletonStyles.skeletonLists}
                    variant={"rectangular"}
                />
            ) : (
                leadersOfWeek.map((item, index: number) => (
                    <Box  key={index}>
                        <Paper className={styles.paperLeaderBoard} sx={{backgroundColor: index === 0 ? "#1230c9" : "transparent"}}>
                            <Box className={styles.leaderBoardBoxContent} onClick={() => navigateToCoinDescription(item.id)}>
                                <Box className={styles.leaderBoardCryptoInfo}>
                                    <Skeleton component='span' animation='wave' variant="circular" width={30} height={30} className={skeletonStyles.skeletonBoardIcon}>
                                        {index + 1}
                                    </Skeleton>
                                    <Box>{item.name}</Box>
                                </Box>

                                <Box className={styles.leaderBoardPriceContentBox}>
                                    <span className={styles.priceIncrease}> Price increase:</span>
                                    <span className={styles.leaderBoardPriceChange} style={{backgroundColor: item.priceChange1w > 0 ? "#1ABC7B" : "#F13005",}}>
                                        {item.priceChange1w}%
                                    </span>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                ))
            )
            }
        </Box>
    )
}


export default React.memo(LeaderBoard);
