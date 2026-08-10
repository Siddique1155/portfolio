/* ==========================================================
   All content here is real — verified against the live sites
   listed, or drawn directly from what Muhammad provided. No
   client names, revenue, user counts or results are invented.
   Where a metric isn't verified, it's left out rather than
   estimated.
   ========================================================== */

const PROFILE = {
  name: 'Muhammad Siddique',
  role: 'AI Automation Engineer • Automation Builder • Frontend & WordPress Developer',
  degree: 'BS Software Engineering — Kohat University of Science & Technology (KUST)',
  graduation: '2022',
  experience: '2+ years of home-based freelance experience',
  email: 'm.siddiq1137@gmail.com',
  whatsapp: '923295145843',
  whatsappDisplay: '+92 329 5145843',
  linkedin: 'https://www.linkedin.com/in/muhammad-siddique-168899220/',
  github: 'https://github.com/Siddique1155',
};

const SKILLS = {
  'AI & Automation': ['n8n', 'AI Agents', 'Workflow Automation', 'WhatsApp Automation', 'Facebook Automation', 'YouTube Automation', 'Telegram Bots', 'CRM Automation', 'API Integrations', 'Webhooks', 'AI Chatbots'],
  'Web Development': ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Elementor', 'Responsive Design', 'SEO', 'Frontend Development'],
  'AI / Data': ['Python', 'Data Analysis', 'Power BI', 'AI APIs', 'Automation APIs'],
};

const ECOSYSTEM_NODES = [
  { id: 'whatsapp', label: 'WhatsApp', angle: 0 },
  { id: 'facebook', label: 'Facebook', angle: 40 },
  { id: 'instagram', label: 'Instagram', angle: 80 },
  { id: 'youtube', label: 'YouTube', angle: 120 },
  { id: 'telegram', label: 'Telegram', angle: 160 },
  { id: 'website', label: 'Website', angle: 200 },
  { id: 'email', label: 'Email', angle: 240 },
  { id: 'crm', label: 'CRM', angle: 280 },
  { id: 'sheets', label: 'Google Sheets', angle: 320 },
];

const ECOSYSTEM_DETAIL = {
  whatsapp: 'Customer messages routed through an AI agent that answers, qualifies and escalates automatically.',
  facebook: 'Scheduled posts and comment replies handled without a person watching every notification.',
  instagram: 'DM and comment automation feeding the same lead pipeline as every other channel.',
  youtube: 'Upload and metadata steps automated as part of a larger content pipeline.',
  telegram: 'Custom bots for support or engagement, running on the same agent core as WhatsApp.',
  website: 'Embedded AI chat that answers from real site content instead of a static FAQ.',
  email: 'Behaviour-triggered sequences instead of one-size-fits-all campaigns.',
  crm: 'Every conversation and lead lands in one place, no manual data entry.',
  sheets: 'Lightweight logging and reporting for workflows that don\u2019t need a full CRM.',
};

/* ---------- Projects ---------- */
const PROJECTS = [
  {
    id: 'nexa-ai',
    category: 'AI Automation Agency',
    title: 'Nexa AI',
    tech: ['n8n', 'AI Agents', 'WhatsApp API', 'Meta API', 'Web Agents'],
    summary: 'A premium AI automation agency concept — WhatsApp, Facebook, YouTube, Telegram and website automation built around real AI-agent architecture.',
    problem: 'Small businesses lose hours a day to repetitive replies, posting and follow-ups spread across too many channels to manage by hand.',
    solution: 'A modular set of automation offerings — one AI-agent core adapted per channel — so a business can automate one channel first and add more without rebuilding anything.',
    architecture: 'Channel APIs (WhatsApp Business, Meta, Telegram) → n8n orchestration → LLM agent layer → CRM/Sheets sync → human handoff on edge cases.',
    result: 'Live concept site, not yet carrying production client traffic — see it live below.',
    liveUrl: 'https://nexa-ai.free.je',
    demoLabel: 'View live site',
  },
  {
    id: 'ai-content-factory',
    category: 'Automation Engineering',
    title: 'AI Content Factory',
    tech: ['n8n', 'Docker', 'PostgreSQL', 'Redis', 'Kokoro TTS', 'FFmpeg'],
    summary: 'An automated content-generation pipeline — script to finished video — built on a self-hosted n8n stack.',
    problem: 'Producing consistent video content end-to-end (script, voice, visuals, edit, export) takes a full production team most channels don\u2019t have.',
    solution: 'A pipeline where a single trigger drafts a script, splits it into scenes, generates voice and imagery, assembles the edit and exports with metadata — no manual handoff between steps.',
    architecture: 'Manual Trigger → AI Script Generator → Scene Splitter → Scene Image Generation → Kokoro TTS Audio → FFmpeg Assembly → Video Export → Metadata & Thumbnail.',
    result: 'Running as a personal automation engineering project — not yet client-deployed.',
    liveUrl: null,
    demoLabel: null,
  },
  {
    id: 'whatsapp-assistant',
    category: 'AI Automation System',
    title: 'Nexa AI — WhatsApp AI Assistant',
    tech: ['WhatsApp Business API', 'Meta Webhooks', 'n8n', 'AI Agent', 'Google Sheets'],
    summary: 'An AI agent that reads incoming WhatsApp messages, applies business logic, and responds or logs the conversation automatically.',
    problem: 'Every WhatsApp message a business gets is either answered slowly by a person or not at all outside business hours.',
    solution: 'Meta webhooks feed incoming messages into an n8n workflow, where an AI agent classifies intent, checks business logic, and either replies directly or logs the lead to Google Sheets / CRM for follow-up.',
    architecture: 'Customer → WhatsApp → Meta Webhook → n8n → AI Agent → Business Logic → Google Sheets / CRM → Response.',
    result: 'Built and tested as part of the Nexa AI service line — case-by-case client rollout.',
    liveUrl: null,
    demoLabel: null,
  },
  {
    id: 'sims-kohat',
    category: 'WordPress Development',
    title: 'SIMS Kohat',
    tech: ['WordPress', 'Elementor', 'Rank Math SEO', 'UpdraftPlus'],
    summary: 'A live WordPress website for a safety-training institute in Kohat, Pakistan — NEBOSH, IOSH and OSHA course pages, enrollment flow, and SEO structure.',
    problem: 'A local safety-training institute needed a professional, mobile-friendly site that could list certified courses and take enrollments online.',
    solution: 'Built on WordPress with Elementor for fast page iteration, Rank Math for on-page SEO, and UpdraftPlus for backups — a stack the client can maintain without a developer on retainer.',
    architecture: 'WordPress core → Elementor page building → Rank Math SEO configuration → UpdraftPlus scheduled backups.',
    result: 'Live and in production — footer credits the build directly.',
    liveUrl: 'https://simskohat.com',
    demoLabel: 'View live site',
  },
  {
    id: 'fujairah-recovery',
    category: 'Website Development',
    title: 'Fujairah Car Recovery',
    tech: ['Responsive Design', 'SEO Structure', 'Service Pages'],
    summary: 'A live business website for a 24/7 vehicle towing and recovery service in Fujairah, UAE — service pages, coverage areas, and a click-to-WhatsApp request flow.',
    problem: 'An emergency recovery service needed a site built around one job: getting a stuck driver to call or WhatsApp immediately, from any device.',
    solution: 'A responsive, service-first layout with clear calls to action, an SEO-oriented structure for local search, and a request form that opens WhatsApp pre-filled with the driver\u2019s details.',
    architecture: 'Static responsive front-end → service/area content structure → click-to-call and click-to-WhatsApp request flow (no server-side data storage).',
    result: 'Live and in production — footer credits the build directly.',
    liveUrl: 'https://fujairahcarrecovery.com',
    demoLabel: 'View live site',
  },
  {
    id: 'previous-portfolio',
    category: 'Previous Portfolio',
    title: 'Previous Portfolio',
    tech: ['HTML', 'CSS', 'JavaScript'],
    summary: 'An earlier personal portfolio, now superseded by this site.',
    problem: null,
    solution: null,
    architecture: null,
    result: 'Kept live as a record of earlier work — this current site is the active portfolio.',
    liveUrl: 'https://siddique1155.github.io/portfolio/',
    demoLabel: 'View previous portfolio',
    isPrevious: true,
  },
];

/* ---------- Process ---------- */
const PROCESS_STEPS = [
  { n: '01', title: 'Discover', text: 'Understand the business problem — what\u2019s manual, what\u2019s slow, what\u2019s costing the most time.' },
  { n: '02', title: 'Design', text: 'Plan the automation or system architecture before writing a single workflow node.' },
  { n: '03', title: 'Build', text: 'Develop the workflow, website or AI system against the agreed architecture.' },
  { n: '04', title: 'Integrate', text: 'Connect APIs, platforms, CRM and business tools so data moves without manual entry.' },
  { n: '05', title: 'Test', text: 'Validate the complete workflow end to end, including edge cases and failure paths.' },
  { n: '06', title: 'Launch', text: 'Deploy and hand over a system that keeps running without Muhammad in the loop.' },
];

/* ---------- Services ---------- */
const SERVICES = [
  { icon: 'automation', title: 'AI Automation', text: 'Build automated business workflows around your actual tools, not a generic template.' },
  { icon: 'whatsapp', title: 'WhatsApp Automation', text: 'AI-powered WhatsApp communication — replies, qualification and handoff.' },
  { icon: 'crm', title: 'CRM Automation', text: 'Lead management and automated follow-up so nothing sits untouched.' },
  { icon: 'agent', title: 'AI Agents', text: 'Personal and business AI agents built for a specific job, not a generic chatbot.' },
  { icon: 'social', title: 'Social Media Automation', text: 'Automate posting and reply workflows across the platforms you actually use.' },
  { icon: 'web', title: 'Website AI Chatbots', text: 'Convert website visitors into qualified leads without a live agent on call.' },
  { icon: 'youtube', title: 'YouTube Automation', text: 'Automated content-production pipelines from script to scheduled upload.' },
  { icon: 'telegram', title: 'Telegram Bots', text: 'Smart bots and channel automation for support, sales or community.' },
  { icon: 'wordpress', title: 'WordPress Development', text: 'Professional business websites built on WordPress and Elementor.' },
  { icon: 'custom', title: 'Custom Automation', text: 'Systems built around whatever your business actually needs — not a fixed package.' },
];

/* ---------- Experience ---------- */
const EXPERIENCE = [
  { period: '2022', title: 'BS Software Engineering', place: 'Kohat University of Science & Technology (KUST)', text: 'Graduated with a foundation in software engineering that now underpins the automation and web systems Muhammad builds.' },
  { period: '2022 — Present', title: 'Freelance Automation & Web Developer', place: 'Home-based, remote', text: 'Two-plus years building frontend websites, WordPress sites, and AI/automation systems for clients — the projects on this page are drawn from that work.' },
];
