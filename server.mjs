import express from 'express';
import fetch from 'node-fetch';

const app = express();
const history = [];

app.use(express.static('public'));
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const prompt = req.body.prompt;

    // Ajouter le message de l'utilisateur à l'historique
    history.push({ role: 'user', text: prompt });

    try {
        const response = await fetch(`https://discussion-continue-gem29.vercel.app/api?ask=${encodeURIComponent(prompt)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Ajouter la réponse du bot à l'historique
        history.push({ role: 'bot', text: data.response || 'No response field in JSON' });

        res.json({ text: data.response || 'No response field in JSON' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur de serveur' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
