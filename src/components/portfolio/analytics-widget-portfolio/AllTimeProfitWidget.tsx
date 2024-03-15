import {Box, Paper, Typography} from "@mui/material";
import backgroundTransparent from "../../../assets/images/image/bgTransparent.svg";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import coinsBtc from "../../../assets/images/image/coinsBtc.webp";
import React from "react";

type AllTimeProfitWidgetPropsType = {
    totalProfit : number
}

export const AllTimeProfitWidget = ({totalProfit} : AllTimeProfitWidgetPropsType) => {

    return (
        <Paper
            sx={{
                borderRadius: "20px",
                width: "270px",
                height: "150px",
                backgroundImage: `url(${backgroundTransparent})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: "rgba(143,130,130,0.09)",
                position: "relative",
            }}
        >
            <Typography variant={"h6"} sx={{fontWeight: "bold"}}>
                ALL TIME PROFIT
            </Typography>
            <Box
                sx={{
                    color: totalProfit >= 0 ? "#1ABC7B" : "#F13005",
                    fontWeight: "bold",
                    marginTop: "20px",
                    fontSize: "20px",
                }}
            >
                {formattedPrice(totalProfit)}$
            </Box>
            <img
                style={{
                    position: "absolute",
                    width: "100px",
                    bottom: "10px",
                    right: "20px",
                }}
                src={coinsBtc}
                alt="crypto-coin-image"
            />
        </Paper>
    )
}
