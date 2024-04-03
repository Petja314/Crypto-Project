import {Avatar, Box, Grid, Paper, Typography} from "@mui/material";
import React from "react";
import {portfolioFirebaseDataType} from "../../../redux/PortfolioReducer";
import {formatCurrency} from "@coingecko/cryptoformat";
import styles from "../../../css/widgets/performance-widget.module.css"

type PerformersWidgetsPropsType = {
    performers: portfolioFirebaseDataType[]
}

export const PerformersWidgets = ({performers}: PerformersWidgetsPropsType) => {

// Filtering performers to avoid duplicates: if all coins have profit/loss = 0, then show only 1 coin
    const filteredUniquePerformers = performers.filter((value, index: number) => {
        return index === performers.findIndex((compareObject): boolean => value.id === compareObject.id)
    })
    return (
        <>
            {
                filteredUniquePerformers.map((item, index: number) => (
                    <Paper className={styles.paperPerformers} key={index}>
                        <Box className={styles.performersBoxContent}>
                            <Box>
                                <Box component="span" className={styles.profitLossDialog}>
                                    {item.profitLoss <= 0 ? (
                                        <Box>Worst Performer</Box>
                                    ) : (
                                        <Box>Best Performer</Box>
                                    )}
                                </Box>

                                <Box className={styles.performersAvatarSection}>
                                    <Avatar src={item.icon}/>
                                    <Box>
                                        <Typography variant="h6"> {item.symbol} </Typography>
                                    </Box>
                                </Box>

                                <Box className={styles.profitLossAmount} component="span" sx={{backgroundColor: item.profitLoss > 0 ? "#1ABC7B" : "#F13005"}}>
                                    {formatCurrency(item.profitLoss, "USD", "en")}
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                ))
            }
        </>
    )
}
