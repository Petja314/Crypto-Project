import {Avatar, Box, Grid, Paper, Typography} from "@mui/material";
import React from "react";
import {portfolioFirebaseDataType} from "../../redux/PortfolioReducer";
import {formatCurrency} from "@coingecko/cryptoformat";

type PerformersWidgetsPropsType = {
    performers : portfolioFirebaseDataType[]
}

export const PerformersWidgets = ({performers}: PerformersWidgetsPropsType) => {

// Filtering performers to avoid duplicates: if all coins have profit/loss = 0, then show only 1 coin
    const filteredUniquePerformers = performers.filter((value, index : number) => {
        return index === performers.findIndex((compareObject) : boolean => value.id === compareObject.id)
    })
    // console.log('filteredUniquePerformers :', filteredUniquePerformers)
    return (
        <>
            {
                filteredUniquePerformers.map((item, index: number) => (
                    <Paper
                        key={index}
                        sx={{borderRadius: "20px", width: "200px", height: "150px"}}
                    >
                        <Grid container sx={{display: "flex", alignItems: "center", justifyContent: "center",}}>
                            <Grid item>
                                <Box component="span" sx={{color: "#B8B8B8", fontSize: "15px", fontWeight: "bold",}}>
                                    {item.profitLoss <= 0 ? (
                                        <Box>Worst Performer</Box>
                                    ) : (
                                        <Box>Best Performer</Box>
                                    )}
                                </Box>

                                <Box sx={{display: "flex", alignItems: "center", gap: 1, marginBottom: "10px", marginTop: "5px",}}>
                                    <Avatar src={item.icon}/>
                                    <Box>
                                        <Typography variant="h6"> {item.symbol} </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    component="span"
                                    sx={{
                                        color: "#fff",
                                        fontSize: "14px",
                                        padding: "5px",
                                        textAlign: "center",
                                        borderRadius: "5px",
                                        backgroundColor:
                                            item.profitLoss > 0 ? "#1ABC7B" : "#F13005",
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {formatCurrency(item.profitLoss, "USD", "en")}$
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
        </>
    )
}
