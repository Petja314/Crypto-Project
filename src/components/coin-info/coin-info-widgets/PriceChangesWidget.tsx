import {Box, Paper, Typography} from "@mui/material";
import React from "react";
import {ListSkeleton} from "../../widgets/ListSkeleton";
import skeletonStyles from "../../../css/coin-info/skeleton-coinInfo.module.css";
import {coinDataArray} from "../../../redux/CoinDescriptionReducer";
import {formatPercent} from "../../../commons/functions/percentFormatter";
import styles from "../../../css/coin-info/price-changes-widget.module.css"

type PriceChangesWidgetPropsType = {
    coinData: coinDataArray[],
    isLoading: boolean
}

type priceWidgetDataType = {
    price: number,
    name: string
}
/**
 * PriceChangesWidget Component:
 * Displays price changes of a selected coin over different time intervals.
 */

const PriceChangesWidget = ({coinData, isLoading}: PriceChangesWidgetPropsType) => {
    // Array of coin's price changes
    const priceChangesWidgetData: priceWidgetDataType[] = [
        {price: coinData[0]?.priceChange1d, name: "Price changed 1d"},
        {price: coinData[0]?.priceChange1h, name: "Price changed 1h"},
        {price: coinData[0]?.priceChange1w, name: "Price changed 1w"},
    ]
    return (
        <Box className={styles.priceWidgetWrapper}>

            {!isLoading ? (
                <ListSkeleton
                    columns={3}
                    skeletonClass={skeletonStyles.skeletonPriceWidgetData}
                    variant={"rectangle"}
                />
            ) : (
                <>
                    {
                        priceChangesWidgetData.map((item: priceWidgetDataType, index: number) => (
                            <Paper key={index} className={styles.paperPriceWidget}>
                                <Typography className={styles.priceNaming}>{item.name}</Typography>
                                <Box className={styles.priceInPercent} sx={{background: item.price < 0 ? "#F13005" : "#1ABC7B"}}>
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
