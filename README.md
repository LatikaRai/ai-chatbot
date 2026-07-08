# Xoni

I wanted to build an AI chatbot from scratch instead of relying on ready-made templates, so this project was a good excuse to learn how real-time communication works using Socket.IO and how to deploy a full-stack application.

Xoni is built with React on the frontend and Express on the backend, with Google's Gemini API handling the AI responses.

### Live

🌐 https://ai-chatbot-eight-chi-20.vercel.app/

---

## What it can do

- Have real-time conversations with Gemini AI
- Clean and responsive chat interface
- Markdown support for AI responses
- Mobile-friendly layout
- Instant communication using Socket.IO

---

## Built with

**Frontend**
- React
- Vite
- Tailwind CSS
- Socket.IO Client

**Backend**
- Node.js
- Express
- Socket.IO
- Gemini API

**Deployment**
- Vercel
- Railway

---

## Running locally

Clone the repository

```bash
git clone https://github.com/LatikaRai/ai-chatbot.git
```

Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

Create a `.env` file inside the backend.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Create another `.env` inside the frontend.

```env
VITE_API_URL=http://localhost:3000
```

Start the backend

```bash
npm start
```

Start the frontend

```bash
npm run dev
```

---

## Things I learned

This project taught me a lot more than just calling an AI API.

- Managing real-time communication with Socket.IO
- Connecting a React frontend with an Express backend
- Handling CORS between different domains
- Deploying a full-stack application using Railway and Vercel
- Working with environment variables in production
- Debugging deployment issues that don't appear locally

---

## What's next

I'd like to improve Xoni by adding:

- Separate chat history for each user
- Authentication
- Multiple conversations
- Image upload support
- Streaming AI responses
- Better animations and UI polish

---

If you find a bug or have suggestions, feel free to open an issue or a pull request.
