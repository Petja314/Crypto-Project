import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {coinDescriptionActions, coinDescriptionDataThunk} from "../../redux/CoinDescriptionReducer";
import {Box, Button, Container,} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import CryptoExplorers from "./CryptoExplorers";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import CoinTableInfo from "./CoinTableInfo";
import CoinDataLinksWidget from "./coin-info-widgets/CoinDataLinksWidget";
import CryptoChart from "./chart/CryptoChart";
import PriceChangesWidget from "./coin-info-widgets/PriceChangesWidget";
import styles from "../../css/coin-info/coin-container-desc.module.css"


/**
 * Description : CoinContainerDescription Component:
 * This component facilitates the retrieval of selected coin and currency data via API calls,
 * displaying various components required on the page.
 */

const CoinContainerDescription = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const {coinData, isLoading} = useSelector((state: RootState) => state.coinDetails)
    const {currencyValue} = useSelector((state: RootState) => state.marketCoinList)

    useEffect(() => {
        //Dispatching selected coin id , and currency $ | £ ...
        dispatch(coinDescriptionDataThunk(id, currencyValue.value))
        return () => {
            dispatch(coinDescriptionActions.isLoadingCoinDetailsAC(false))
        }
    }, [id]);

    const navigateToPortfolioPage = () => {
        navigate(`/portfolio`)
    }
    return (
        <Container className={styles.container}>
            <Box className={styles.coinBoxContent}>
                <Box className={styles.coinInfoSection}>

                    {/*INFORMATION ABOUT THE SELECTED CURRENCY IN TABLE*/}
                    <CoinTableInfo
                        currencyValue={currencyValue}
                        isLoading={isLoading}
                    />
                    {/*LINK'S WIDGET OF SELECTED COIN*/}
                    <CoinDataLinksWidget
                        coinData={coinData}
                        isLoading={isLoading}
                    />
                    <Button className={styles.addToPortfolioBtn} onClick={navigateToPortfolioPage}>
                        Add to portfolio
                    </Button>
                </Box>

                <Box className={styles.coinChartPriceSection}>

                    {/*CRYPTO CHART OF SELECTED COIN*/}
                    <CryptoChart/>

                    {/*PRICE WIDGET OF SELECTED COIN*/}
                    <PriceChangesWidget
                        coinData={coinData}
                        isLoading={isLoading}
                    />
                </Box>
            </Box>


            <CryptoExplorers
                coinData={coinData}
                isLoading={isLoading}
            />

        </Container>

    )
}

export default React.memo(CoinContainerDescription);

