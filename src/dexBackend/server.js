const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;
const axios = require('axios');
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack || err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

app.get("/tokenPrice", async (req, res) => {
    const {query} = req;
    try{
        const responseOne = await Moralis.EvmApi.token.getTokenPrice({
            address: query.addressOne
        });
        const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
            address: query.addressTwo
        });
        const usdPrices = {
            tokenOne: responseOne.raw.usdPrice,
            tokenTwo: responseTwo.raw.usdPrice,
            ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice
        }
        return res.status(200).json(usdPrices);
    }
    catch(error){
        console.error(error)
        res.json({error})

    }

});


app.get("/dexApproveAllowance", async (req, res) => {
    const {tokenAddress, walletAddress} = req.query;
    try {
        const response = await axios.get(`https://api.1inch.dev/swap/v6.0/1/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`, {
            headers: {
                "Authorization": process.env.REACT_APP_ONE_INCH_KEY
            },
        });
        res.json(response.data);
    }
    catch(error){
        console.error(error)
        res.json({error})
    }

});

app.get("/approveTransactionDex", async (req, res) => {
    const {tokenAddress} = req.query
    try {
        const response = await axios.get(`https://api.1inch.dev/swap/v6.0/1/approve/transaction?tokenAddress=${tokenAddress}`, {
            headers: {
                "Authorization": process.env.REACT_APP_ONE_INCH_KEY
            },
        });
        res.json(response.data);
    }
    catch(error) {
        console.error(error)
        res.json({error})
    }

})

app.get("/swapCoinDex", async (req, res) => {
    const {selectedTokenOne, selectedTokenTwo, tokenOnePrice, address} = req.query;
    console.log("tokenOnePrice" , tokenOnePrice)
    try {
        const response = await axios
            .get(`https://api.1inch.dev/swap/v6.0/1/swap?src=${selectedTokenOne}&dst=${selectedTokenTwo}&amount=${tokenOnePrice}&from=${address}&slippage=1`,
                {
                headers: {
                    "Authorization": process.env.REACT_APP_ONE_INCH_KEY
                }
            })
        res.json(response.data)
        console.log('swap response :', response.data)
    } catch (error) {
        console.error(error)
        res.json({error})
    }
})


Moralis.start({
    apiKey: process.env.MORALIS_KEY,
}).then(() => {
    app.listen(port, () => {
        console.log(`Listening for API Calls`);
    });
});


