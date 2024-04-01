import {Box, IconButton, Paper} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import {Link} from "react-router-dom";
import React from "react";
import BackgroundBlock from "../../../assets/images/image/block_bg.svg"
import {ListSkeleton} from "../../widgets/ListSkeleton";
import styles from "../../../css/coin-info/skeleton-coinInfo.module.css"
import {coinDataArray} from "../../../redux/CoinDescriptionReducer";


type coinDataWidgetType = {
    label : string ,
    icon : any ,
    value : string
}

type CoinDataLinksWidgetPropsType = {
    coinData : coinDataArray[],
    isLoading: boolean
}

/**
 * CoinDataLinksWidget Component:
 * Organizes data into an array to display social media accounts associated with the selected coins.
 */


const CoinDataLinksWidget = ({coinData,isLoading}: CoinDataLinksWidgetPropsType) => {
    // coinDataWidget array was created to make jsx more structural , contains data about the coin social media accounts
    const coinDataWidget : coinDataWidgetType[] = [
        {label: 'Website', icon: <LanguageIcon/>, value: coinData[0]?.websiteUrl},
        {label: 'Github', icon: <XIcon/>, value: coinData[0]?.twitterUrl},
        {label: 'Reddit', icon: <LanguageIcon/>, value: coinData[0]?.redditUrl},
    ]

    return (
        <Box>

            { !isLoading ? (
                <ListSkeleton columns={1}
                              skeletonClass={styles.skeletonLinksWidget}
                              variant={"rectangle"}
                />
            ) : (
                <Paper sx={{
                    marginTop: "20px", width: {lg : "450px" , xs : "100%"}, borderRadius: '20px', height : "120px",
                    backgroundImage: `url(${BackgroundBlock})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: "rgba(255, 255, 255, 0.09)",
                    maxWidth : "100%"
                }}>
                    <Box sx={{fontWeight: "bold", fontSize: "20px", textAlign: "center"}}>
                        Official links
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", marginTop: "10px" , maxWidth : "100%"}}>

                        {coinDataWidget.map((item : coinDataWidgetType , index : number) => (
                            <Box key={index}>
                                <Link to={item.value}>
                                    <IconButton sx={{color: "#E0F64B"}}>
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

