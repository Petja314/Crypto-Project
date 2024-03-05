import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {coinDescriptionDataThunk} from "../redux/CoinDescriptionReducer";
import {Box, Button, Container,} from "@mui/material";
import {useParams} from "react-router-dom";
import {CryptoChart} from "./chart/CryptoChart";
import {formattedPrice} from "../../commons/formattedPrice";
import {PriceChangesWidget} from "./coin-info-widgets/PriceChangesWidget";
import {CoinTableInfo} from "./CoinTableInfo";
import {CoinDataLinksWidget} from "./coin-info-widgets/CoinDataLinksWidget";
import CryptoExplorers from "./CryptoExplorers";
import {RootState} from "../redux/ReduxStore";

export const CoinContainerDescription = () => {
    const dispatch: any = useDispatch()
    const {id} = useParams()
    const {coinData} = useSelector((state: any) => state.coinDetails)
    const {currencyValue} = useSelector((state: RootState) => state.marketCoinList)


    useEffect(() => {
        dispatch(coinDescriptionDataThunk(id, currencyValue.value))
    }, [id]);
    return (
        <Container>
            <Box sx={{marginTop: "50px", marginBottom: "50px"}}>
                {
                    coinData.map((item: any, index: any) => (
                        <Box key={index}>

                            <Box sx={{display: "flex", gap: 3}}>

                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <CoinTableInfo
                                        currencyValue={currencyValue}
                                        formattedPrice={formattedPrice}
                                        item={item}
                                    />
                                    <CoinDataLinksWidget item={item}/>
                                    <Button sx={{marginTop: "20px"}}>Add to portfolio</Button>

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








