const express = require('express')
const cors = require("cors");

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-chatbot-eight-chi-20.vercel.app",
    "https://ai-chatbot-lq2r2dkdh-zen-stack.vercel.app",
  ],
  credentials: true,
}));

module.exports = app