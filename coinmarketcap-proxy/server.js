const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());  // Enable CORS for all routes
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Server is working!');
});

const coinGeckoApiKey = process.env.REACT_APP_API_KEY_CRYPTO_GECKO

const instance = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
    headers: {
        'x-cg-demo-api-key': coinGeckoApiKey,
    }
})

app.get('/coins/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(`Handling /coins/${id} request`);
    try {
        const response = await instance.get(`coins/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/coins/:id/market_chart?vs_currency=usd&days=7', async (req, res) => {
//     const { id } = req.params;
//     console.log(`Handling /coins/${id}/market_chart?vs_currency=usd&days=7 request`);
//     try {
//         const response = await instance.get(`coins/${id}/market_chart?vs_currency=usd&days=7`);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.get('/coins/:id/market_chart', async (req, res) => {
    const { id } = req.params;
    const { vs_currency, days } = req.query;

    console.log(`Handling /coins/${id}/market_chart request`);

    try {
        const response = await instance.get(`coins/${id}/market_chart`, {
            params: {
                vs_currency: vs_currency || 'usd',
                days: days || 7,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




