import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {formattedPrice} from "../../commons/functions/formattedPrice";
import coinsBtc from "../../assets/images/image/coinsBtc.webp";
import backgroundTransparent from "../../assets/images/image/bgTransparent.svg";

const Performer = () => {
    const {myCurrentPortfolioDataFB} = useSelector((state: any) => state.myPortfolio,);
    const [performers, setPerformers] = useState<any>([]);
    const [totalProfit, setTotalProfit] = useState<any>(0);

    useEffect(() => {
        //Checking before initializing if the array is defined
        if (myCurrentPortfolioDataFB && myCurrentPortfolioDataFB.length > 0) {
            console.log('render')
            let largestItem = myCurrentPortfolioDataFB[0]; //Counting the largest value from 0
            let smallestItem = myCurrentPortfolioDataFB[0]; //Counting the smallest value from the first object of the array.

            for (let i = 1; i < myCurrentPortfolioDataFB.length; i++) {
                if (myCurrentPortfolioDataFB[i].profitLoss > largestItem.profitLoss) {
                    largestItem = myCurrentPortfolioDataFB[i];
                    // console.log('largestItem' , largestItem)
                }
                if (myCurrentPortfolioDataFB[i].profitLoss < smallestItem.profitLoss) {
                    smallestItem = myCurrentPortfolioDataFB[i];
                    // console.log('smallestItem' , smallestItem)
                }
            }


            setPerformers([largestItem, smallestItem]);
            // CALCULATE TOTAL PORTFOLIO PROFIT
            const calculateTotalProfit = myCurrentPortfolioDataFB.reduce((accum: any, value: any) => accum + value.profitLoss, 0,);
            setTotalProfit(calculateTotalProfit);
        }
    }, [myCurrentPortfolioDataFB]);
    // console.log('performers' , performers)
    // console.log('myCurrentPortfolioDataFB' , myCurrentPortfolioDataFB)

    // const bestPerformer = myCurrentPortfolioDataFB.reduce((worst:any, current:any) => {
    //     return current.profitLoss > worst.profitLoss ? current : worst;
    // }, myCurrentPortfolioDataFB[0]);
    //
    // const worstPerformer = myCurrentPortfolioDataFB.reduce((worst:any, current:any) => {
    //     return current.profitLoss < worst.profitLoss ? current : worst;
    // }, myCurrentPortfolioDataFB[0]);
    return (
        <Box>
            <Box sx={{display: "flex", gap: 2}}>
                <Paper
                    sx={{
                        borderRadius: "20px",
                        width: "270px",
                        height: "150px",
                        backgroundImage: `url(${backgroundTransparent})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "rgba(143,130,130,0.09)",
                        position: "relative",
                    }}
                >
                    <Typography variant={"h6"} sx={{fontWeight: "bold"}}>
                        ALL TIME PROFIT
                    </Typography>
                    <Box
                        sx={{
                            color: totalProfit >= 0 ? "#1ABC7B" : "#F13005",
                            fontWeight: "bold",
                            marginTop: "20px",
                            fontSize: "20px",
                        }}
                    >
                        {formattedPrice(totalProfit)}$
                    </Box>
                    <img
                        style={{
                            position: "absolute",
                            width: "100px",
                            bottom: "10px",
                            right: "20px",
                        }}
                        src={coinsBtc}
                        alt=""
                    />
                </Paper>

                {performers.map((item: any, index: any) => (
                    <Paper
                        key={index}
                        sx={{borderRadius: "20px", width: "200px", height: "150px"}}
                    >
                        <Grid
                            container
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Grid item>
                                <Box
                                    component="span"
                                    sx={{
                                        color: "#B8B8B8",
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.profitLoss <= 0 ? (
                                        <Box>Worst Performer</Box>
                                    ) : (
                                        <Box>Best Performer</Box>
                                    )}
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        marginBottom: "10px",
                                        marginTop: "5px",
                                    }}
                                >
                                    <Avatar src={item.icon}/>
                                    <Box>
                                        <Typography variant="h6"> {item.symbol} </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    component="span"
                                    sx={{
                                        color: "#fff",
                                        fontSize: "14px",
                                        padding: "5px",
                                        textAlign: "center",
                                        borderRadius: "5px",
                                        backgroundColor:
                                            item.profitLoss > 0 ? "#1ABC7B" : "#F13005",
                                        display: "flex",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {formattedPrice(item.profitLoss)}$
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Box>

            {/*<Box mt={4} >*/}
            {/*    <AddTransactionContainer/>*/}
            {/*    <Button onClick={() => dispatch(PortfolioActions.isPortfolioDialogOpenAC(true))}>*/}
            {/*        Add Transaction*/}
            {/*    </Button>*/}
            {/*</Box>*/}
        </Box>
    );
};

export default Performer;
