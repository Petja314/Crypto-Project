import React from 'react';
import {Box, Container, Grid, IconButton, Paper, Skeleton, Typography} from "@mui/material";

const News = () => {
    return (
        <Box>
            <Container
                sx={{marginBottom: "50px"}}
            >

            <Typography
                variant='h4'
                sx={{
                    marginTop: "50px",
                    marginBottom: "20px",
                    color: "#fff"
                }}
            >
                News
            </Typography>

            {
                cryptoNews.map(item => (
                    <Paper sx={{borderRadius: '20px', marginBottom: "30px"}}>
                        <Grid container
                        >
                            <Grid item
                                  sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      gap: 10
                                  }}
                            >
                                <Box sx={{ position: 'relative', overflow: 'hidden', width: '400px', height: '200px', borderRadius: '10px' }}>
                                    <img
                                        src={item.img}
                                        alt=""
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </Box>


                                <Box>
                                    <Typography
                                        variant='h5'
                                        sx={{
                                            marginBottom: "10px",
                                            fontWeight: "bold",
                                        }}
                                    >{item.title}</Typography>
                                    <Box>{item.descripiton}</Box>

                                    <Box>{item.tag}</Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            }
            </Container>

        </Box>
    );
};

export default News;


const cryptoNews = [
    {
        "id": 1,
        "title": "Market Analyst Foresees Ethereum and Altcoins Gaining as Bitcoin Hits Potential High",
        "img": "https://en.bitcoinhaber.net/wp-content/uploads/2024/02/altcoin-026-1.jpg",
        "descripiton": "A prominent market analyst has indicated that while Bitcoin (BTC) may be nearing its price apex, Ethereum (ETH) and other alternative cryptocurren..",
        "tag": "#BTC"
    },
    {
        "id": 2,
        "title": "PiggyVest hosts ecosystem leaders to a roundtable about the Nigerian financial landscape",
        "img": "https://image.coinpedia.org/wp-content/uploads/2024/02/20233827/Coinpedia-image-26-1024x536.webp",
        "descripiton": "A prominent market analyst has indicated that while Bitcoin (BTC) may be nearing its price apex, Ethereum (ETH) and other alternative cryptocurren..",
        "tag": "#SOL"
    },
    {
        "id": 3,
        "title": "Which Crypto to Invest in? Cheap Cryptos with 100x Potential!",
        "img": "https://en.coin-turk.com/wp-content/uploads/2024/02/altcoin-news-26-2.jpg",
        "descripiton": "A prominent market analyst has indicated that while Bitcoin (BTC) may be nearing its price apex, Ethereum (ETH) and other alternative cryptocurren..",
        "tag": "#ETH"
    },
    {
        "id": 4,
        "title": "Soaring Dogecoin Charts Signal Potential Bull Run",
        "img": "https://www.cryptopolitan.com/wp-content/uploads/2024/02/Ecosystem_map_V14_Press_Release_1708441321PQSaLibhVO.jpg",
        "descripiton": "A prominent market analyst has indicated that while Bitcoin (BTC) may be nearing its price apex, Ethereum (ETH) and other alternative cryptocurren..",
        "tag": "#LTC"
    },
    {
        "id": 5,
        "title": "Which Crypto to Invest in? Cheap Cryptos with 100x Potential!",
        "img": "https://en.coin-turk.com/wp-content/uploads/2024/02/altcoin-news-26-2.jpg",
        "descripiton": "A prominent market analyst has indicated that while Bitcoin (BTC) may be nearing its price apex, Ethereum (ETH) and other alternative cryptocurren..",
        "tag": "#ETH"
    },



]