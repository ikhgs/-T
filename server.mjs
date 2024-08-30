import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await fetch(`https://llama3-70b.vercel.app/api?ask=${encodeURIComponent(prompt)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Vérifiez le statut de la réponse
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Pour débogage
        res.json({ text: data.response || 'No response field in JSON' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur de serveur' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
