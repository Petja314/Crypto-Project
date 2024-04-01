import {Box, Paper, Typography} from "@mui/material";
import React from "react";
import {ListSkeleton} from "../../widgets/ListSkeleton";
import styles from "../../../css/coin-info/skeleton-coinInfo.module.css";
import {coinDataArray} from "../../../redux/CoinDescriptionReducer";
import {formatPercent} from "../../../commons/functions/percentFormatter";

type PriceChangesWidgetPropsType ={
    coinData :   coinDataArray[],
    isLoading : boolean
}

type priceWidgetDataType = {
    price:number,
    name: string
}
/**
 * PriceChangesWidget Component:
 * Displays price changes of a selected coin over different time intervals.
 */

 const PriceChangesWidget = ({coinData, isLoading}: PriceChangesWidgetPropsType) => {
    // Array of coin's price changes
    const priceChangesWidgetData : priceWidgetDataType[] = [
        {price: coinData[0]?.priceChange1d, name: "Price changed 1d"},
        {price: coinData[0]?.priceChange1h, name: "Price changed 1h"},
        {price: coinData[0]?.priceChange1w, name: "Price changed 1w"},
    ]
    return (
        // <Box mt={5} sx={{display: {lg : "flex" , xs : "none"}, justifyContent: "space-evenly",  gap: 5, maxWidth : "100%"}}>
        <Box mt={5} sx={{display: {lg : "flex" , xs : "none"}, justifyContent: "space-evenly", flexWrap : { lg : "nowrap" , xs : "wrap"}, gap: 5, maxWidth : "100%"}}>

            {!isLoading ? (
                <ListSkeleton columns={3}
                              skeletonClass={styles.skeletonPriceWidgetData}
                              variant={"rectangle"}
                />
            ) : (
                <>
                    {
                        priceChangesWidgetData.map((item: priceWidgetDataType, index: number) => (
                            <Paper key={index} sx={{borderRadius: '20px', padding: "30px", height: "100", width: "150", maxWidth : "100%"}}>
                            {/*<Paper key={index} sx={{borderRadius: '20px', padding: "30px", height: "150px", width: "200px", maxWidth : "100%"}}>*/}
                                <Typography sx={{textAlign: "center"}}>{item.name}</Typography>
                                <Box sx={{background: item.price < 0 ? "#F13005" : "#1ABC7B", borderRadius: "5px", padding: "5px", textAlign: "center", marginTop: "30px",}}>
                                    {formatPercent(item.price)}
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

export default React.memo(PriceChangesWidget);
