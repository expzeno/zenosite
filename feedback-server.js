import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');
const SCREENSHOT_DIR = path.join(__dirname, 'feedback-screenshots');
const PORT = process.env.PORT || 32400;

const app = express();
app.use(cors({ origin: ['https://zs.labzeno.com', 'https://siteez.labzeno.com', 'http://localhost'] }));
app.use(express.json({ limit: '12mb' }));

async function readEntries() {
  try { return JSON.parse(await fs.readFile(FEEDBACK_FILE, 'utf8')); }
  catch { return []; }
}

const normalizeCategory = (raw) => {
  const x = String(raw || '').toLowerCase().trim();
  if (x === 'bug') return 'Bug';
  if (x.includes('ui')) return 'UI Issue';
  if (x.includes('feature')) return 'Feature Request';
  return 'General';
};

app.post('/feedback/submit', async (req, res) => {
  // Accept { data: {...} } (standard envelope) or flat body (legacy)
  const body = req.body?.data ?? req.body;
  const { message, category, pageUrl, screenshot } = body;

  // §22: message OR screenshot required
  if (!message?.trim() && !screenshot) {
    return res.status(400).json({ ok: false, message: 'Message or screenshot is required' });
  }

  const entries = await readEntries();
  const maxId = entries.reduce((m, e) => (typeof e.id === 'number' && e.id > m ? e.id : m), 0);
  const entry = {
    id: maxId + 1,
    category: normalizeCategory(category),
    message: String(message || '').slice(0, 5000),
    pageUrl: pageUrl || '',
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  if (screenshot) {
    try {
      await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
      const base64 = String(screenshot).replace(/^data:image\/\w+;base64,/, '');
      const rawBuffer = Buffer.from(base64, 'base64');
      const sanitized = await sharp(rawBuffer)
        .resize({ width: 800, withoutEnlargement: true })
        .png({ quality: 80 })
        .toBuffer();
      const filename = `feedback-${entry.id}-${Date.now()}.png`;
      await fs.writeFile(path.join(SCREENSHOT_DIR, filename), sanitized);
      entry.screenshot = filename;
    } catch {
      // screenshot is best-effort, don't block submission
    }
  }

  entries.push(entry);
  await fs.writeFile(FEEDBACK_FILE, JSON.stringify(entries, null, 2));
  res.json({ ok: true, id: entry.id });
});

app.get('/health', (_req, res) => res.json({ ok: true, service: 'zenosite-feedback' }));
app.listen(PORT, () => console.log(`zenosite feedback server on :${PORT}`));
