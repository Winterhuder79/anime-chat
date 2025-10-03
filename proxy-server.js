// Einfacher Proxy-Server für OpenAI API
// Umgeht CORS-Probleme im Browser

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

// ⚠️ WICHTIG: Setze hier einen GÜLTIGEN API-Key ein!
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key-here';

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'Proxy Server läuft', port: PORT });
});

app.get('/api', (req, res) => {
  res.json({ status: 'API Proxy aktiv', endpoints: ['/api/chat/completions'] });
});

// OpenAI Proxy Endpoint - KORREKTE ROUTE!
app.post('/api/chat/completions', async (req, res) => {
  try {
    const { model = 'gpt-4', messages, temperature = 0.8, max_tokens = 500 } = req.body;

    console.log('📥 Chat Completions Anfrage erhalten:', { 
      model, 
      messages: messages?.length || 0,
      temperature,
      max_tokens 
    });

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages,
        temperature,
        max_tokens,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        timeout: 60000,
      }
    );

    console.log('✅ Antwort von OpenAI erhalten');
    
    // Sende die komplette OpenAI Response zurück
    res.json(response.data);
  } catch (error) {
    console.error('❌ Proxy Fehler:', error.response?.data || error.message);

    const status = error.response?.status || 500;
    const errorData = error.response?.data || { 
      error: { 
        message: error.message || 'Server-Fehler',
        type: 'proxy_error'
      } 
    };

    res.status(status).json(errorData);
  }
});

// Legacy endpoint für Kompatibilität
app.post('/api/chat', async (req, res) => {
  console.log('⚠️  Legacy /api/chat Route verwendet - verwende /api/chat/completions');
  req.url = '/api/chat/completions';
  return app._router.handle(req, res);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Proxy Server läuft auf http://localhost:${PORT}`);
  console.log(`🌍 Erreichbar auch unter http://192.168.150.165:${PORT}`);
  console.log(`📡 Haupt-Endpoint: POST http://localhost:${PORT}/api/chat/completions`);
  console.log('');
  if (!OPENAI_API_KEY || OPENAI_API_KEY.length < 10) {
    console.log('⚠️  WICHTIG: API-Key in Zeile 11 eintragen!');
  } else {
    console.log('✅ OpenAI API-Key ist gesetzt');
  }
});
