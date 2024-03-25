import React, {useEffect, useState} from "react";
import {Avatar, Box, Button, Grid, Paper, Skeleton, SkeletonClasses, Stack, Typography} from "@mui/material";
import {ReactComponent as LeaderIcon} from "../../assets/images/icons/icon-cup-dark.svg"
import {useSelector} from "react-redux";
import {RootState} from "../redux/ReduxStore";
import {marketCapListArray} from "../redux/CryptoTableReducer";
import {useNavigate} from "react-router-dom";
import styles from "../../css/dashboard/skeleton-dashboard.module.css"
import {ListSkeleton} from "./ListSkeleton";


const LeaderBoard = () => {
    const navigate = useNavigate()
    const {marketCapList, fetching} = useSelector((state: RootState) => state.marketCoinList)
    const [leadersOfWeek, setLeadersOfWeek] = useState<marketCapListArray[]>([])
    const [columns, setColumns] = useState([])

    useEffect(() => {
        if (!fetching) {
            // console.log('in')
            const sortedData = marketCapList.sort((a, b) => a.priceChange1w - b.priceChange1w)
            const top = sortedData.slice(sortedData.length - 10).reverse()
            setLeadersOfWeek(top)
        }
    }, [fetching, marketCapList])

    const navigateToCoinDescription = (id: any) => {
        navigate(`/coin_info/${id}`)
    }



    return (
        <Box>
            <Typography variant='h6' sx={{color: "white", marginBottom: "10px", display: "flex", alignItems: "center", gap: 1}}>
                <LeaderIcon/>
                Leaderboard of the week
            </Typography>


            { leadersOfWeek.length  <= 0 ? (
                <ListSkeleton
                    columns={10}
                    skeletonClass={styles.skeletonLists}
                    variant={"rectangular"}
                />
            ) : (
                leadersOfWeek.map((item: any, index: any) => (
                    <Box>
                        <Paper key={index} sx={{
                            borderRadius: '20px', marginBottom: "10px", width: "500px", height: "60px", maxWidth: "100%", maxHeight: "100%",
                            backgroundColor: index === 0 ? "#1230c9" : "transparent",
                        }}>
                            <Grid container sx={{alignItems: 'center', cursor: "pointer"}} onClick={() => navigateToCoinDescription(item.id)}>
                                <Grid item xs={6}>
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
                                </Grid>

                                <Grid item xs={6}>
                                    <Box> Price increase
                                        :<Box component='span' sx={{
                                            borderRadius: '5px', marginLeft: "5px", padding: "5px",
                                            backgroundColor: item.priceChange1w > 0 ? "#1ABC7B" : "#F13005",
                                        }}>
                                            {item.priceChange1w}%
                                        </Box>
                                    </Box>
                                </Grid>

                            </Grid>

                        </Paper>
                    </Box>

                ))
            )
            }
        </Box>
    )
}


export default LeaderBoard