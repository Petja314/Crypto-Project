import {Box, Paper, Typography} from "@mui/material";
import {formattedPrice} from "../../../commons/formattedPrice";
import React from "react";

export const PriceChangesWidget = ({item}: any) => {
    const priceChangesWidgetData = [
        {"price": item.priceChange1d, name: "Price changed 1d"},
        {"price": item.priceChange1h, name: "Price changed 1h"},
        {"price": item.priceChange1w, name: "Price changed 1w"},
    ]

    return (
        <Box mt={5} sx={{display: "flex", justifyContent: "space-evenly", gap: 5}}>
            {
                priceChangesWidgetData.map((item: any, index: any) => (
                    <Paper key={index} sx={{borderRadius: '20px', padding: "30px"}}>
                        <Typography sx={{textAlign : "center"}} >{item.name}</Typography>
                        <Box sx={{background: item.price < 0 ? "#F13005" : "#1ABC7B", borderRadius: "5px", padding: "5px", textAlign: "center", marginTop: "30px"}}>
                            {formattedPrice(item.price)}%
                        </Box>
                    </Paper>

                ))
            }
        </Box>
    )
}