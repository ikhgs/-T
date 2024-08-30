const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Clé API Gemini directement dans le code
const apiKey = 'AIzaSyBZT3HnSDr_T3xdlHN5ktVQmqeB_dvn7LY';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route pour l'API de chat
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://generativeai.googleapis.com/v1beta2/models/gemini-1-5-pro:generateText', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: {
                    text: userMessage
                }
            })
        });

        const data = await response.json();
        const botReply = data.text || 'No response received';
        res.json({ reply: botReply });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ reply: 'Internal Server Error' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
