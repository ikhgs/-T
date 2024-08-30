document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('reset-chat').addEventListener('click', resetChat);

const apiKey = 'AIzaSyBZT3HnSDr_T3xdlHN5ktVQmqeB_dvn7LY';
let chatHistory = [];

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    // Envoyer la requête à l'API Gemini
    fetch('https://generativeai.googleapis.com/v1beta2/models/gemini-1-5-pro:generateText', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: {
                text: userInput
            },
            chat: {
                history: chatHistory
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = data.text || 'No response received';
        appendMessage('bot', botMessage);
        chatHistory.push({ role: 'bot', content: botMessage });
    })
    .catch(error => console.error('Error:', error));
}

function appendMessage(role, text) {
    const chatOutput = document.getElementById('chat-output');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(role);
    messageDiv.textContent = text;
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function resetChat() {
    chatHistory = [];
    document.getElementById('chat-output').innerHTML = '';
}
