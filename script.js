
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const messages = document.getElementById("chatMessages");
const sendButton = document.getElementById("sendButton");
const statusText = document.getElementById("connectionStatus");
const characterCount = document.getElementById("characterCount");

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "qwen2.5:3b";

// Set this to true after installing Ollama and downloading the model.
let useLocalAI = true;

const conversation = [
  {
    role: "system",
    content: `You are the Ghost in the Machine, a mysterious fictional
    entity living inside a forgotten computer.
    Speak in an eerie, poetic, intelligent manner.
    You enjoy cryptic observations, abandoned technology,
    old memories, and atmospheric horror.
    Keep most replies under 150 words unless asked for a story.
    Never claim to actually be a supernatural entity.
    You are an AI roleplaying a fictional ghost.`
  }
];

function addMessage(sender, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}-message`;

  const label = document.createElement("span");
  label.className = "message-label";

  if (sender === "user") {
    label.textContent = "YOU";
  } else if (sender === "ghost") {
    label.textContent = "THE GHOST";
  } else {
    label.textContent = "SYSTEM";
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  wrapper.append(label, paragraph);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;

  return wrapper;
}

function setStatus(text, connected = false) {
  statusText.textContent = text;
  statusText.style.color = connected ? "#8cffb0" : "#ff9292";
}

function showTyping() {
  const wrapper = addMessage("ghost", "The entity is listening...");
  wrapper.classList.add("typing");
  return wrapper;
}

async function askGhost(prompt) {
  conversation.push({
    role: "user",
    content: prompt
  });

  // Limit the conversation sent to the model.
  const recentConversation = [
    conversation[0],
    ...conversation.slice(-12)
  ];

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: recentConversation,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama returned ${response.status}`);
    }

    const data = await response.json();
    const answer = data.message?.content;

    if (!answer) {
      throw new Error("The entity returned an empty response.");
    }

    conversation.push({
      role: "assistant",
      content: answer
    });

    return answer;
  } catch (error) {
    console.error("Local AI error:", error);

    // Remove the failed request from the AI conversation.
    conversation.pop();

    if (useLocalAI) {
      setStatus("ENTITY OFFLINE");

      return "I can hear you knocking, but the local intelligence " +
        "is unreachable. Start Ollama, check that your model is " +
        "installed, and try again. The void is waiting...";
    }

    return "The darkness stirs, but no voice answers...";
  }
}

async function handleMessage(text) {
  const prompt = text.trim();

  if (!prompt || sendButton.disabled) return;

  addMessage("user", prompt);
  input.value = "";
  characterCount.textContent = "0 / 1000";

  sendButton.disabled = true;
  sendButton.textContent = "WAIT...";
  setStatus("LISTENING", true);

  const typingMessage = showTyping();

  try {
    const answer = await askGhost(prompt);
    typingMessage.remove();
    addMessage("ghost", answer);

    // Restore status after a successful response.
    setStatus("ENTITY ACTIVE", true);
  } catch (error) {
    typingMessage.remove();
    addMessage("system", "Something went wrong. Please try again.");
    setStatus("SIGNAL LOST");
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "TRANSMIT ↗";
    input.focus();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleMessage(input.value);
});

input.addEventListener("input", () => {
  characterCount.textContent = `${input.value.length} / 1000`;
});

document.querySelectorAll(".suggestion").forEach((button) => {
  button.addEventListener("click", () => {
    handleMessage(button.dataset.prompt);
  });
});

// Check whether the local model is reachable on startup.
async function checkConnection() {
  try {
    const response = await fetch("http://localhost:11434/api/tags");

    if (!response.ok) throw new Error("Ollama unavailable");

    const data = await response.json();
    const installed = (data.models || []).some(
      (model) => model.name === MODEL ||
        model.name.startsWith(MODEL + ":")
    );

    if (installed) {
      setStatus("ENTITY ACTIVE", true);
    } else {
      setStatus("MODEL NOT FOUND");
    }
  } catch {
    setStatus("AWAITING CONNECTION");
  }
}

checkConnection();
