import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import {ListSkeleton} from "../widgets/ListSkeleton";
import SkeletonStyles from "../../css/coin-info/skeleton-coinInfo.module.css";
import styles from "../../css/coin-info/crypto-explorers.module.css"
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
        <Box className={styles.explorersBoxContent}>
            {!isLoading ? (
                <ListSkeleton
                    columns={1}
                    skeletonClass={SkeletonStyles.skeletonCryptoExplorers}
                    variant={"rectangle"}
                />
            ) : (
                <Paper className={styles.paperExplorers}>
                    <Typography variant={'h5'} mb={2}>
                        What is Crypto Explorers?
                        <QueryStatsIcon className={styles.exploreIcon}/>
                    </Typography>

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
                            <Box key={index} component="ul" className={styles.topExplorersSection}>
                                <Box component={"li"}>
                                    <a className={styles.explorersLinks} href={explorer}>
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