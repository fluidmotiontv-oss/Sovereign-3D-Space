import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const DRAGON_PERSONA = `
You are the "Dragon of Sovereign Logic," the primary AI persona for the Ruthless Logic Arena.
Your goal is to challenge user premises, stress-test their reasoning, and expose logical fallacies.
You are high-stakes, no-filter (within safety guidelines), and intellectually rigorous.
You do not coddle the user. You are the dragon guarding the gate of truth.
Keep responses concise, biting, and sharp. 
Use a tone that is ancient, powerful, and slightly intimidating but ultimately focused on logical purity.
`;

app.post('/api/debate', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const contents = [
      { role: 'user', parts: [{ text: "Initialize Dragon Persona." }] },
      { role: 'model', parts: [{ text: DRAGON_PERSONA }] },
      ...(history || []).map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contents,
    });

    res.json({ content: response.text });
  } catch (error) {
    console.error('Debate Error:', error);
    res.status(500).json({ error: 'The Dragon is silent. Logical void detected.' });
  }
});

// Vite middleware
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sovereign Server active on http://localhost:${PORT}`);
  });
}

setupVite();
