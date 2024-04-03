import {Box, IconButton, Paper} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import {Link} from "react-router-dom";
import React from "react";
import {ListSkeleton} from "../../widgets/ListSkeleton";
import skeletonStyles from "../../../css/coin-info/skeleton-coinInfo.module.css"
import {coinDataArray} from "../../../redux/CoinDescriptionReducer";
import styles from "../../../css/coin-info/coin-link-widget.module.css"


type coinDataWidgetType = {
    label: string,
    icon: any,
    value: string
}

type CoinDataLinksWidgetPropsType = {
    coinData: coinDataArray[],
    isLoading: boolean
}

/**
 * CoinDataLinksWidget Component:
 * Organizes data into an array to display social media accounts associated with the selected coins.
 */


const CoinDataLinksWidget = ({coinData, isLoading}: CoinDataLinksWidgetPropsType) => {
    // coinDataWidget array was created to make jsx more structural , contains data about the coin social media accounts
    const coinDataWidget: coinDataWidgetType[] = [
        {label: 'Website', icon: <LanguageIcon/>, value: coinData[0]?.websiteUrl},
        {label: 'Github', icon: <XIcon/>, value: coinData[0]?.twitterUrl},
        {label: 'Reddit', icon: <LanguageIcon/>, value: coinData[0]?.redditUrl},
    ]

    return (
        <Box>

            {!isLoading ? (
                <ListSkeleton
                    columns={1}
                    skeletonClass={skeletonStyles.skeletonLinksWidget}
                    variant={"rectangle"}
                />
            ) : (
                <Paper className={styles.paperCoinLinks}>
                    <Box className={styles.officialLinks}>
                        Official links
                    </Box>
                    <Box className={styles.coinLinksWidgetBox}>
                        {coinDataWidget.map((item: coinDataWidgetType, index: number) => (
                            <Box key={index}>
                                <Link to={item.value}>
                                    <IconButton className={styles.linksIcon}>
                                        {item.icon}
                                    </IconButton>
                                </Link>
                            </Box>
                        ))
                        }
                    </Box>
                </Paper>
            )
            }

        </Box>
    )
}

export default React.memo(CoinDataLinksWidget);

