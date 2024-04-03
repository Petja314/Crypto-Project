import {Box, Paper, Typography} from "@mui/material";
import coinsBtc from "../../../assets/images/image/coinsBtc.webp";
import React from "react";
import {formatCurrency} from "@coingecko/cryptoformat";
import styles from "../../../css/widgets/performance-widget.module.css"

type AllTimeProfitWidgetPropsType = {
    totalProfit: number
}

export const AllTimeProfitWidget = ({totalProfit}: AllTimeProfitWidgetPropsType) => {

    return (
        <Paper className={styles.paperAllTimeProfit}>
            <Typography variant={"h6"}>All time profit</Typography>
            <Box className={styles.totalProfit} sx={{color: totalProfit >= 0 ? "#1ABC7B" : "#F13005"}}>
                {formatCurrency(totalProfit, "USD", "en")}
            </Box>
            <img className={styles.profitImage} src={coinsBtc} alt="crypto-coin-image"/>
        </Paper>
    )
}
