
# 👻 Ghost in the Machine

> Something is listening. Speak carefully. It remembers things you don't.

A spooky, interactive AI terminal built with **HTML, CSS, JavaScript, and Ollama**. Chat with a mysterious fictional ghost, generate horror stories, and explore the eerie side of artificial intelligence using a locally running open-weight model.

## ✨ Features

- 👻 **Haunted Terminal UI** — A dark interface with glowing green text, scanlines, and atmospheric animations.
- 🤖 **Local AI Chat** — Interact with a fictional ghost powered by an AI model running on your computer.
- 📖 **Horror Story Generator** — Generate creepy stories and mysterious responses.
- 💬 **Quick Prompts** — Start conversations with predefined spooky questions.
- 🔒 **Privacy-Focused** — Your prompts can remain on your machine when using local inference.
- 📴 **Offline AI** — Chat without internet after downloading the software and model, provided the local service is running.
- 📱 **Responsive Design** — Works on desktop and mobile screens.

## 🛠️ Tech Stack

- **HTML5** — Application structure
- **CSS3** — Styling, animations, and responsive layout
- **JavaScript** — Chat interactions and API communication
- **Ollama** — Local AI inference
- **Qwen2.5 3B** — Open-weight language model

## 📁 Project Structure

```text
ghost-in-the-machine/
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ Requirements

Before running the project, install:

- A modern web browser
- Python 3, for the local development server
- [Ollama](https://ollama.com/download)
- An internet connection for the initial software and model downloads

## 🚀 Getting Started

### 1. Clone or download the project

If your project is hosted on GitHub:

```bash
git clone <your-repository-url>
cd ghost-in-the-machine
```

Alternatively, create the project folder and save the three application files inside it.

### 2. Download the AI model

Open a terminal and run:

```bash
ollama pull qwen2.5:3b
```

This downloads the model to your computer.

### 3. Start Ollama

Run:

```bash
ollama serve
```

If Ollama is already running as a background service, you do not need to start it again.

You can test the model with:

```bash
ollama run qwen2.5:3b
```

### 4. Start the website

Open a terminal inside the project folder and run:

```bash
python -m http.server 8000
```

### 5. Open the application

Visit:

http://localhost:8000

The Ghost in the Machine interface should appear in your browser.

Type a message or select one of the suggested prompts to begin chatting.

## 🔌 AI Configuration

The JavaScript application connects to Ollama's local chat API.

Default configuration:

```javascript
const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "qwen2.5:3b";
```

Make sure the selected model is installed and Ollama is running.

If browser requests are blocked, configure Ollama's CORS permissions to allow your local development origin. Do not expose the model API publicly.

## 🔐 Privacy and Offline Support

This project is designed to use local AI inference.

- Conversations are sent to the local Ollama service rather than a hosted AI API.
- Model inference can work without an internet connection after setup.
- The model and software must first be downloaded.
- External fonts and other online resources may require internet access.
- No cloud-based AI provider is required by the default architecture.

**Note:** Local inference helps keep prompts on your device, but privacy also depends on your operating system, installed software, and any additional services you choose to integrate.

## 🌱 Why Open Innovation Matters

Ghost in the Machine demonstrates how open-weight AI can make creative, interactive applications more private, customizable, and accessible.

Instead of depending on a proprietary hosted AI API, the project runs a model locally. Developers can experiment with different models, customize the ghost's personality, inspect the application code, and build new features without paying a per-request fee to a hosted AI provider.

This approach also reduces dependence on a single cloud service and makes offline experiences possible.

The selected model has its own license, so review that license before redistributing the model or making broader claims about open-source compliance.

## 🔮 Future Improvements

- [ ] Add animated glitch and possession effects.
- [ ] Add local conversation history.
- [ ] Add text-to-speech for a ghostly voice.
- [ ] Add a local horror story library.
- [ ] Add a private digital remembrance mode.
- [ ] Allow users to switch between supported AI models.
- [ ] Add streaming responses for real-time typing effects.
- [ ] Improve error handling and connection diagnostics.

## 🐛 Troubleshooting

### The ghost does not respond

- Make sure Ollama is running.
- Confirm that `qwen2.5:3b` is installed.
- Check that `http://localhost:11434/api/tags` is reachable.
- Open your browser's developer console and inspect any network errors.

### The browser reports a connection or CORS error

Serve the website through the local development server instead of opening the HTML file directly. If necessary, configure Ollama to permit requests from `http://localhost:8000`.

### The model runs slowly

Local AI performance depends on available RAM, processor, and GPU resources. Try a smaller compatible model if your hardware struggles with the 3B model.

## 📜 License

Choose a license for your own project before publishing it. If you use a permissive license such as MIT, include the appropriate `LICENSE` file.

The AI model and third-party dependencies may have separate licenses.

## 👻 Acknowledgments

- [Ollama](https://ollama.com/) — Local AI inference
- [Qwen](https://github.com/QwenLM) — Open-weight language models
- The open-source community — Tools and ideas that make experimentation possible

---

**Built from open intelligence. Haunted by imagination.**
