import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');
const PORT = process.env.PORT || 32400;

const app = express();
app.use(cors({ origin: ['https://siteez.labzeno.com', 'http://localhost'] }));
app.use(express.json({ limit: '2mb' }));

async function readEntries() {
  try { return JSON.parse(await fs.readFile(FEEDBACK_FILE, 'utf8')); }
  catch { return []; }
}

app.post('/feedback/submit', async (req, res) => {
  const { message, category, pageUrl } = req.body;
  if (!message?.trim()) return res.status(400).json({ ok: false, message: 'Message is required' });

  const entries = await readEntries();
  const maxId = entries.reduce((m, e) => (e.id > m ? e.id : m), 0);
  const entry = {
    id: maxId + 1,
    category: category || 'General',
    message: String(message).slice(0, 5000),
    pageUrl: pageUrl || '',
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  entries.push(entry);
  await fs.writeFile(FEEDBACK_FILE, JSON.stringify(entries, null, 2));
  res.json({ ok: true, id: entry.id });
});

app.get('/health', (_req, res) => res.json({ ok: true, service: 'zenosite-feedback' }));

app.listen(PORT, () => console.log(`zenosite feedback server on :${PORT}`));
