import {Avatar, Box, Button, Container, Paper, Typography} from "@mui/material";
import stepOne from "../../assets/images/icons/numbers/1icon.svg";
import metamaskLogo from "../../assets/images/image/metamaskLogo.svg";
import stepTwo from "../../assets/images/icons/numbers/2icon.svg";
import connectMetamask from "../../assets/images/image/connectmetamask.jpeg";
import stepThree from "../../assets/images/icons/numbers/3icon.svg";
import tokenSwap from "../../assets/images/image/tokenswap.png";
import React from "react";
import dexWorld from "../../assets/images/image/dex-world.webp"
import styles from "../../css/dex/dex.module.css"

export const DexUsageInstruction = () => {
    return (
        <Container sx={{marginTop: "70px"}}>
            <Paper sx={{
                borderRadius: "20px", display: "flex",
                justifyContent: {md: "space-between", xs: "flex-start"},
                flexDirection: {md: "row", xs: "column"},
                width: "900px",
                maxWidth: "100%",
                gap: 5,
                margin: "0 auto",
                padding: "30px"
            }}>
                <Box sx={{marginTop: "50px"}}>
                    <Typography variant={"h4"} sx={{fontWeight: "bold", textAlign: "center", fontSize: {lg: "48px", md: "30px", xs: "25px"}}}>Get started with Mi Crypto DEX exchange
                        ERC-20.</Typography>
                    <Box sx={{marginTop: "30px", fontSize: "20px"}}>With MiCrypto Dex, you can effortlessly swap any ERC token. Simply follow the straightforward steps below and enjoy the
                        process!</Box>
                </Box>


                <Box sx={{margin: {xs: "0 auto", lg: "none"}}}>
                    <img src={dexWorld} alt="" className={styles.dexImage}
                        // style={{width:"450px"}}
                    />
                </Box>
            </Paper>

            <Avatar sx={{width: {xs : "70px", md : "100px"}, height: {xs : "70px", md : "100px"}, marginTop: "30px", marginBottom: "30px"}} src={stepOne}/>

            <Paper sx={{
                borderRadius: "20px",
                display: "flex",
                justifyContent: {md: "space-between", xs: "flex-start"},
                flexDirection: {md: "row", xs: "column"},
                width: "700px",
                gap: 5, padding: "30px"
                , maxWidth: "100%"
            }}>
                <Box sx={{marginTop: "20px"}}>
                    <Typography variant={"h5"} sx={{fontWeight: "bold"}}>Get the metamask wallet</Typography>
                    <Box sx={{marginTop: "30px", fontSize: "20px"}}>Install browser extension metamask , register and start enjoying the convenience of tracking and managing your web3 everything, all
                        in one place. </Box>
                    <a href="https://metamask.io/">
                        <Button sx={{marginTop: "20px"}}> Get Metamask</Button>
                    </a>
                </Box>
                <Box sx={{margin: {xs: "0 auto", lg: "none"}}}>
                    <img className={styles.metamaskImage} src={metamaskLogo} alt=""
                    />
                </Box>
            </Paper>

            <Avatar sx={{width: {xs : "70px", md : "100px"}, height: {xs : "70px", md : "100px"}, marginLeft: "auto", marginTop: "30px", marginBottom: "30px"}} src={stepTwo}/>


            <Paper sx={{
                borderRadius: "20px", marginLeft: "auto", width: "700px", display: "flex",
                justifyContent: {md: "space-between", xs: "flex-start"},
                flexDirection: {md: "row", xs: "column"},
                gap: 5, padding: "30px", maxWidth: "100%"
            }}>
                {/*float : "right"*/}
                <Box sx={{margin: {xs: "0 auto", lg: "none"}}}>
                    <img className={styles.walletImage} src={connectMetamask} alt=""
                         // style={{width: "200px", borderRadius: "20px"}}
                    />
                </Box>

                <Box sx={{marginTop: "20px",}}>
                    <Typography variant={"h5"} sx={{fontWeight: "bold"}}>Connect you wallet</Typography>
                    <Box sx={{marginTop: "30px", fontSize: "20px"}}>By pressing the connect button choose the metamask wallet and connect it to our DEX exchange.Make sure that you selected ERC-20
                        mainnet to make a swaps </Box>
                    <Box sx={{marginTop: "20px"}}>
                        <w3m-button/>
                    </Box>
                </Box>
            </Paper>

            <Avatar sx={{width: {xs : "70px", md : "100px"}, height: {xs : "70px", md : "100px"}, marginTop: "30px", marginBottom: "30px"}} src={stepThree}/>


            <Paper sx={{
                borderRadius: "20px", display: "flex", justifyContent: {md: "space-between", xs: "flex-start"},
                flexDirection: {md: "row", xs: "column"}, width: "700px", gap: 5, padding: "30px", maxWidth: "100%"
            }}>
                <Box sx={{marginTop: "20px"}}>
                    <Typography variant={"h5"} sx={{fontWeight: "bold"}}>Select tokens to swap. </Typography>
                    <Box sx={{marginTop: "30px", fontSize: "20px"}}>After token was choose press the swap button and confirm make the transaction approve, make sure that you have enough tokens for gas
                        , and confirm the
                        <Box component={'span'} sx={{color: "#e0f64b", fontWeight: "bold"}}> SWAP!</Box>
                    </Box>
                </Box>

                <Box sx={{margin: {xs: "0 auto", lg: "none"}}}>
                    <img className={styles.swapImage} src={tokenSwap} alt=""
                         // style={{width: "250px", borderRadius: "20px"}}
                    />
                </Box>
            </Paper>


        </Container>
    )
}
