import {Box, IconButton, Paper} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import {Link} from "react-router-dom";
import React from "react";
import BackgroundBlock from "../../../assets/images/image/block_bg.svg"


export const CoinDataLinksWidget = ({item}: any) => {
    const coinDataWidgets =  [
        ['Website :', <LanguageIcon/>, item.websiteUrl],
        ['Github :', <XIcon/>, item.twitterUrl],
        ['Reddit :', <LanguageIcon/>, item.redditUrll],
    ]

    return (
        <Paper sx={{
            marginTop: "20px", width: "450px", borderRadius: '20px',
            backgroundImage: `url(${BackgroundBlock})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "rgba(255, 255, 255, 0.09)"
        }}>
            <Box sx={{fontWeight: "bold", fontSize: "20px", textAlign: "center"}}>
                Official links
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", marginTop: "10px"}}>
                {coinDataWidgets.map(([label, image, value], index) => (
                        <Box key={index}>
                            <Link to={value}>
                                <IconButton sx={{color: "#E0F64B"}}>
                                    {image}
                                </IconButton>
                            </Link>
                        </Box>
                    ))
                }
            </Box>
        </Paper>
    )
}