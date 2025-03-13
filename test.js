const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // to serve static files from public directory

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            prompt: userInput,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ message: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error calling the OpenAI API:', error);
        res.status(500).send('Error processing your request');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
