document.getElementById('send-button').addEventListener('click', async () => {
    const promptInput = document.getElementById('prompt-input');
    const prompt = promptInput.value;
    if (prompt.trim() === '') return;

    const responseBox = document.getElementById('response');
    responseBox.innerHTML += `<p>User: ${prompt}</p>`;
    responseBox.innerHTML += '<p>Loading...</p>';

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        responseBox.innerHTML += `<p>Bot: ${data.text}</p>`;
    } catch (error) {
        responseBox.innerHTML += '<p>Error occurred. Please try again.</p>';
    }

    // Effacer le message de l'utilisateur
    promptInput.value = '';
});
