import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {coinDataArray, coinDescriptionDataThunk} from "../redux/CoinDescriptionReducer";
import {Box, Button, Container,} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {CryptoChart} from "./chart/CryptoChart";
import {formattedPrice} from "../../commons/functions/formattedPrice";
import {PriceChangesWidget} from "./coin-info-widgets/PriceChangesWidget";
import {CoinTableInfo} from "./CoinTableInfo";
import {CoinDataLinksWidget} from "./coin-info-widgets/CoinDataLinksWidget";
import CryptoExplorers from "./CryptoExplorers";
import {RootState} from "../redux/ReduxStore";

export const CoinContainerDescription = () => {
    const dispatch: any = useDispatch()
    const navigate =  useNavigate()
    const {id  }= useParams()
    const {coinData} = useSelector((state: RootState) => state.coinDetails) as { coinData: coinDataArray[] }
    const {currencyValue} = useSelector((state: RootState) => state.marketCoinList)

    useEffect(() => {
        dispatch(coinDescriptionDataThunk(id, currencyValue.value))
    }, [id]);

    const navigateToPortfolioPage = () => {
        navigate(`/portfolio`)
    }

    return (
        <Container>
            <Box sx={{marginTop: "50px", marginBottom: "50px"}}>
                {
                    coinData.map((item , index: number) => (
                        <Box key={item.id}>

                            <Box sx={{display: "flex", gap: 3}}>

                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <CoinTableInfo
                                        currencyValue={currencyValue}
                                        item={item}
                                    />
                                    <CoinDataLinksWidget item={item}/>
                                    <Button onClick={navigateToPortfolioPage} sx={{marginTop: "20px"}}>Add to portfolio</Button>

                                </Box>

                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <CryptoChart/>
                                    <PriceChangesWidget item={item}/>
                                </Box>
                            </Box>

                            <CryptoExplorers
                                item={item.explorers}
                            />

                        </Box>
                    ))
                }


            </Box>
        </Container>

    )
}








