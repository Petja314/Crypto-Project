import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BackgroundBlock from "../../assets/images/image/block_bg.svg"
import {ListSkeleton} from "../widgets/ListSkeleton";
import styles from "../../css/coin-info/skeleton-coinInfo.module.css";
import {coinDataArray} from "../../redux/CoinDescriptionReducer";

type CryptoExplorersPropsType = {
    coinData: coinDataArray[],
    isLoading: boolean
}

/**
 * CryptoExplorers Component:
 * Provides an explanation of what crypto explorers are and displays the current crypto explorers of the selected coin.
 */

const CryptoExplorers = ({coinData, isLoading}: CryptoExplorersPropsType) => {
    //Explorers of selected coin
    const topExplorers: string[] = coinData[0]?.explorers

    return (
        <Box mt={3} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {!isLoading ? (
                <ListSkeleton columns={1}
                              skeletonClass={styles.skeletonCryptoExplorers}
                              variant={"rectangle"}
                />
            ) : (
                <Paper sx={{
                    borderRadius: '20px', padding: "30px",
                    height: "1200px",
                    backgroundImage: `url(${BackgroundBlock})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: "rgba(255, 255, 255, 0.09)",
                    maxHeight: "100%",
                    maxWidth: "100%"
                }}>
                    <Typography variant={'h5'} mb={2}>What is Crypto Explorers? <QueryStatsIcon sx={{color: "#E0F64B"}}/> </Typography>

                    {
                        cryptoExplorersInfo.map(explorersInfo => (
                            <Box mt={3}>
                                <Typography variant={'h6'}>{explorersInfo.title}</Typography>
                                <Box>{explorersInfo.description}</Box>
                            </Box>
                        ))
                    }

                    <Typography mt={3} variant={'h5'}>
                        Top Explorers 🔥
                    </Typography>

                        {topExplorers &&
                            topExplorers.map((explorer: string, index: number) => (
                                // <Box key={index} component="ul" sx={{gap: "30px", display: "grid", padding: "0 0", listStyle: "none",}}>
                                <Box key={index} component="ul" sx={{ padding: "0 0", listStyle: "none", border : "1px solid red"}}>
                                    <Box component={"li"} >


                                        <a
                                            style={{
                                                color: "white",
                                                textDecoration: 'none',
                                                display: 'inline-block',
                                                maxWidth: '100%',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                            href={explorer}
                                        >
                                            🚀 {explorer}
                                        </a>

                                    </Box>
                                </Box>
                            ))
                        }

                </Paper>
            )}
        </Box>
    );
};

export default React.memo(CryptoExplorers);


//EXPLANATION WHAT CRYPTO EXPLORERS ARE
const cryptoExplorersInfo = [
    {
        title: "",
        description: "Crypto Explorers are enthusiasts, researchers, and professionals dedicated to unraveling the mysteries of the cryptocurrency universe. Their endeavors span a wide range of  activities, including:"
    },
    {
        title: "Blockchain Analysis:",
        description: "Investigating and deciphering the intricacies of blockchain technologies.Uncovering patterns, trends, and anomalies within the blockchain data."
    },
    {
        title: "Cryptocurrency Research:",
        description: "Studying various cryptocurrencies, their underlying technologies, and use cases.Analyzing market dynamics and the factors influencing the value of digital assets."
    },
    {
        title: "Ecosystem Exploration:",
        description: "Exploring the diverse ecosystem of decentralized finance (DeFi), non-fungible tokens (NFTs), and other blockchain-based innovations. Keeping abreast of emerging projects and developments within the crypto space."
    },
    {
        title: "Risk Assessment:",
        description: "Evaluating the risks associated with different blockchain projects and cryptocurrencies.Providing insights to the community on potential opportunities and challenges."
    },
]