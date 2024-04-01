import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, Grid, Paper, Skeleton, SkeletonClasses, Stack, Typography} from "@mui/material";
import {ReactComponent as LeaderIcon} from "../../assets/images/icons/icon-cup-dark.svg"
import {useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";
import {marketCapListArray} from "../../redux/CryptoTableReducer";
import {NavigateFunction, useNavigate} from "react-router-dom";
import styles from "../../css/dashboard/skeleton-dashboard.module.css"
import {ListSkeleton} from "./ListSkeleton";
import board from "../../css/dashboard/leader-boards.module.css"


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
            <Typography variant='h6' sx={{color: "white", marginBottom: "10px", display: "flex", alignItems: "center", gap: 1}}>
                <LeaderIcon/>
                Leaderboard of the week
            </Typography>

            {leadersOfWeek.length <= 0 ? (
                <ListSkeleton
                    columns={10}
                    skeletonClass={styles.skeletonLists}
                    variant={"rectangular"}
                />
            ) : (
                leadersOfWeek.map((item, index: number) => (
                    <Box>
                        <Paper key={index} sx={{
                            borderRadius: '20px', marginBottom: "10px", width: {lg: "500px", xs: "100%"}, height: "60px", maxWidth: "100%", maxHeight: "100%",
                            backgroundColor: index === 0 ? "#1230c9" : "transparent"
                        }}>


                            <Box sx={{alignItems: 'center', cursor: "pointer", display: "flex", justifyContent: "space-between"}} onClick={() => navigateToCoinDescription(item.id)}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Skeleton component='span' animation='wave' variant="circular" width={30} height={30} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', backgroundColor: '#e0f64b', color: "black",
                                    }}>
                                        {index + 1}
                                    </Skeleton>
                                    <Box>{item.name}</Box>
                                </Box>


                                <Box sx={{display: "flex", gap: 2}}>
                                    <span className={board.priceIncrease}> Price increase:</span>
                                    <span
                                        style={{
                                            borderRadius: '5px',
                                            height: "24px",
                                            width: "68px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto",
                                            padding: "5px",
                                            backgroundColor: item.priceChange1w > 0 ? "#1ABC7B" : "#F13005",
                                        }}>
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
