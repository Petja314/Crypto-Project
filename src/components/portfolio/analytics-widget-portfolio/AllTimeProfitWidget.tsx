import {Box, Paper, Typography} from "@mui/material";
import backgroundTransparent from "../../../assets/images/image/bgTransparent.svg";
import coinsBtc from "../../../assets/images/image/coinsBtc.webp";
import React from "react";
import {formatCurrency} from "@coingecko/cryptoformat";
import styles from "../../../css/portfolio/portfolio.module.css"

type AllTimeProfitWidgetPropsType = {
    totalProfit: number
}

export const AllTimeProfitWidget = ({totalProfit}: AllTimeProfitWidgetPropsType) => {

    return (
        <Paper
            sx={{
                borderRadius: "20px",
                width: {lg : "270px" , xs: "100%"},
                height: "150px",
                backgroundImage: `url(${backgroundTransparent})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: "rgba(143,130,130,0.09)",
                position: "relative",
            }}
        >

                    <Typography variant={"h6"} sx={{fontWeight: "bold"}}>
                        All time profit
                    </Typography>

                    <Box
                        sx={{
                            color: totalProfit >= 0 ? "#1ABC7B" : "#F13005",
                            fontWeight: "bold",
                            marginTop: "20px",
                            fontSize: "20px",
                        }}
                    >
                        {formatCurrency(totalProfit, "USD", "en")}
                    </Box>




                <img
                    className={styles.profitImage}
                    style={{
                        position: "absolute",
                        width: "70px",
                        bottom: "10px",
                        right: "20px",
                    }}
                    src={coinsBtc}
                    alt="crypto-coin-image"
                />




        </Paper>
    )
}
