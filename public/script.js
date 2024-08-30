document.getElementById('send-button').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt-input').value;
    if (prompt.trim() === '') return;

    const responseBox = document.getElementById('response');
    responseBox.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        // Vérification du statut de la réponse
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Pour débogage
        responseBox.innerHTML = `<p>${data.text || 'No text field in response'}</p>`;
    } catch (error) {
        console.error('Error occurred:', error);
        responseBox.innerHTML = '<p>Error occurred. Please try again.</p>';
    }
});
