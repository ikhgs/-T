import express from 'express';
import fetch from 'node-fetch';

const app = express();
const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBZT3HnSDr_T3xdlHN5ktVQmqeB_dvn7LY';

app.use(express.static('public'));
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await fetch('https://generativeai.googleapis.com/v1beta2/models/gemini-1-5-pro:generateText', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: {
                    text: prompt
                }
            })
        });

        // Vérification du statut de la réponse
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Pour débogage
        res.json({ text: data.text || 'No text field in response' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur de serveur' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
