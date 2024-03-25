import {Box, Paper, Typography} from "@mui/material";
import {formattedPrice} from "../../../commons/functions/formattedPrice";
import React from "react";
import {ListSkeleton} from "../../widgets/ListSkeleton";
import styles from "../../../css/coin-info/skeleton-coinInfo.module.css";
import {coinDataArray} from "../../redux/CoinDescriptionReducer";

type PriceChangesWidgetPropsType ={
    coinData :   coinDataArray[],
    isLoading : boolean
}

type priceWidgetDataType = {
    price:number,
    name: string
}

export const PriceChangesWidget = ({coinData, isLoading}: PriceChangesWidgetPropsType) => {
    const priceChangesWidgetData : priceWidgetDataType[] = [
        {price: coinData[0]?.priceChange1d, name: "Price changed 1d"},
        {price: coinData[0]?.priceChange1h, name: "Price changed 1h"},
        {price: coinData[0]?.priceChange1w, name: "Price changed 1w"},
    ]
    return (
        <Box mt={5} sx={{display: "flex", justifyContent: "space-evenly", gap: 5}}>
            {!isLoading ? (
                <ListSkeleton columns={3}
                              skeletonClass={styles.skeletonPriceWidgetData}
                              variant={"rectangle"}
                />
            ) : (
                <>
                    {
                        priceChangesWidgetData.map((item, index: any) => (
                            <Paper key={index} sx={{borderRadius: '20px', padding: "30px", height: "150px", width: "200px"}}>
                                <Typography sx={{textAlign: "center"}}>{item.name}</Typography>
                                <Box sx={{background: item.price < 0 ? "#F13005" : "#1ABC7B", borderRadius: "5px", padding: "5px", textAlign: "center", marginTop: "30px"}}>
                                    {formattedPrice(item.price)}%
                                </Box>
                            </Paper>

                        ))
                    }
                </>
            )
            }
        </Box>
    )
}