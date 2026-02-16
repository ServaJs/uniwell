const panel = document.querySelector('.symptomPage');
const openBtn = document.querySelector('.symptom');
const closeBtn = document.querySelector('.btnClose');

panel.style.display = 'none';

function activateMode() {
    panel.style.display = 'flex';
    setTimeout(() => {
        panel.classList.add('active');
    }, 10);
}

function closePanel(){
panel.classList.remove('active');

setTimeout(() => {
    panel.style.display = 'none';
}, 300);
}

openBtn.addEventListener('click', activateMode);
closeBtn.addEventListener('click', closePanel());

 const GROQ_API_KEY = "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"; // Replace with your key
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add messages to the UI
function addMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', role);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Function to call Groq API
async function getGroqResponse(userMessage) {
    addMessage('bot', 'Thinking...'); // Temporary loading text
    
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Or "mixtral-8x7b-32768"
                messages: [{ role: "user", content: userMessage }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        // Remove "Thinking..." message
        chatBox.removeChild(chatBox.lastChild);
        
        const botText = data.choices[0].message.content;
        addMessage('bot', botText);

    } catch (error) {
        console.error("Error:", error);
        chatBox.removeChild(chatBox.lastChild);
        addMessage('bot', "Sorry, something went wrong.");
    }
}

// Event Listeners
sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
        addMessage('user', text);
        userInput.value = '';
        getGroqResponse(text);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});