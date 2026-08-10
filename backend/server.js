/**
 * Muhammad Siddique — portfolio backend
 * POST /api/contact { name, email, message } -> emails Muhammad, replies 202
 *
 * Run:
 *   cd backend
 *   npm install
 *   cp .env.example .env   # fill in SMTP + TO_EMAIL
 *   npm start
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4100;
const TO_EMAIL = process.env.TO_EMAIL || 'm.siddiq1137@gmail.com';

app.use(cors());
app.use(express.json({ limit: '20kb' }));

const formLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 10 });

let transporter = null;
if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
} else {
  console.warn('[siddique-api] SMTP_HOST not set — /api/contact will log messages instead of emailing them.');
}

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.post('/api/contact', formLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !isValidEmail(email) || !message) {
    return res.status(400).json({ error: 'name, a valid email, and message are required.' });
  }
  if (String(message).length > 4000) {
    return res.status(400).json({ error: 'message is too long.' });
  }
  const safe = {
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 4000),
  };
  try {
    if (transporter) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: TO_EMAIL,
        replyTo: safe.email,
        subject: `New project inquiry from ${safe.name}`,
        text: `Name: ${safe.name}\nEmail: ${safe.email}\n\n${safe.message}`,
      });
    } else {
      console.log('[siddique-api] Contact form submission (no SMTP configured):', safe);
    }
    return res.status(202).json({ status: 'received' });
  } catch (err) {
    console.error('[siddique-api] Failed to send contact email:', err.message);
    return res.status(502).json({ error: 'Could not send message right now.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const siteRoot = path.join(__dirname, '..');
app.use(express.static(siteRoot));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(siteRoot, 'index.html'));
});

app.listen(PORT, () => console.log(`[siddique-api] listening on http://localhost:${PORT}`));
