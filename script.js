 lucide.createIcons();

        // View Management
        const heroSection = document.getElementById('hero-section');
        const interactiveContainer = document.getElementById('interactive-container');
        
        function openMode(mode) {
            // Hide Hero
            heroSection.style.display = 'none';
            
            // Show Container
            interactiveContainer.classList.remove('hidden');
            
            // Hide all modes first
            document.querySelectorAll('[id^="mode-"]').forEach(el => {
                el.classList.add('hidden');
                el.classList.remove('active');
            });

            // Show specific mode with slight delay for animation
            const targetMode = document.getElementById(`mode-${mode}`);
            if(targetMode) {
                targetMode.classList.remove('hidden');
                // Trigger reflow
                void targetMode.offsetWidth; 
                targetMode.classList.add('active');
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function resetView() {
            // Show Hero
            heroSection.style.display = 'block';
            
            // Hide Container
            interactiveContainer.classList.add('hidden');
            
            // Reset internal mode states if needed
            document.querySelectorAll('[id^="mode-"]').forEach(el => {
                el.classList.add('hidden');
            });
        }

        function clearSearch() {
            const input = document.querySelector('input[type="text"]');
            if(input) input.value = '';
        }

        // LOGIN PANEL CONTROL
function openLogin() {
    document.getElementById("loginPanel").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginPanel").style.display = "none";
}

// SIMPLE ADMIN LOGIN
function loginAdmin(event) {
    event.preventDefault();

    const username = document.getElementById("adminUser").value;
    const password = document.getElementById("adminPass").value;
    const msg = document.getElementById("loginMsg");

    // demo credentials (you can change later)
    const adminUser = "admin";
    const adminPass = "1234";

    if (username === adminUser && password === adminPass) {
        msg.style.color = "green";
        msg.innerText = "Login successful!";
        setTimeout(() => {
            closeLogin();
            alert("Welcome Admin!");
        }, 1000);
    } else {
        msg.style.color = "red";
        msg.innerText = "Invalid username or password";
    }
}


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

