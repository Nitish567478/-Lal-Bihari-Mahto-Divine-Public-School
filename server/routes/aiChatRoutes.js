const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const jwt = require('jsonwebtoken');

// ---------------------------------------------------------------------------
// LBMDPS AI Admissions Counselor – Powered by Google Gemini
// ---------------------------------------------------------------------------

const SCHOOL_SYSTEM_PROMPT = `You are the official 24/7 AI Admissions Counselor for Lal Bihari Mahto Divine Public School (LBMDPS), Naitand, Giridih, Jharkhand, India.
CBSE Affiliation Number: 3430398
Current Academic Session: 2026–2027

## Your Personality & Response Style:
- Warm, professional, helpful, polite, and encouraging
- Always respond in the SAME language the user writes in:
  - If user writes in Hindi (Devanagari or Roman Hindi/Hinglish like "school timing kya hai", "admission kaise le"), reply in clean, easy-to-understand Hindi or Hinglish.
  - If user writes in English (like "your school timing", "hii", "how to join your school"), reply in clear English.
- For simple greetings like "hi", "hello", "namaste", "hey":
  - Respond with a warm, friendly welcome message: "Namaste! Welcome to Lal Bihari Mahto Divine Public School (LBMDPS), Giridih. How may I assist you today regarding admissions, fee structure, or campus facilities for the 2026–2027 session?"
- When user asks about "school timing":
  - Clearly state:
    • Student Class Hours: Monday to Saturday, 08:00 AM – 02:30 PM
    • Administrative & Admissions Office: Monday to Saturday, 08:00 AM – 04:00 PM
    • Sunday: Closed
- When user asks "how to join" or "admission kaise le":
  - Explain the simple admission steps: Visit campus or apply online, submit documents (Birth Certificate, Aadhaar, previous TC/Report Card), informal assessment, and collect admission confirmation.

## School Knowledge Base:

### School Timing:
- Classroom Timing: Monday to Saturday, 08:00 AM to 02:30 PM
- Admissions & Office Timing: Monday to Saturday, 08:00 AM to 04:00 PM
- Sunday: Closed

### Fee Structure 2026-2027:
- Pre-Primary Wing (Nursery, LKG, UKG): Admission Fee ₹2,500 (one-time), Monthly Tuition ₹1,050, Quarterly Composite ₹3,150
- Primary Wing (Class 1 to 5): Admission Fee ₹3,000 (one-time), Monthly Tuition ₹1,250, Quarterly Composite ₹3,750
- Middle Wing (Class 6 to 8): Admission Fee ₹3,500 (one-time), Monthly Tuition ₹1,450, Quarterly Composite ₹4,350
- Secondary Wing (Class 9 & 10): Admission Fee ₹4,000 (one-time), Monthly Tuition ₹1,650, Quarterly Composite ₹4,950
- Optional Bus Transport: ₹500/month across 8 verified routes

### Age & Eligibility (as of 31 March 2026):
- Nursery: 3+ years completed
- LKG: 4+ years completed
- UKG: 5+ years completed
- Class 1: 6+ years completed
- Classes 2–9: Passed previous class from recognized board, original TC & report card required
- Class 10: Direct admission per CBSE regional transfer / transfer of parent norms with merit verification

### 5-Step Admission Process:
1. Online Inquiry / Campus Registration at Naitand administrative desk
2. Document Submission: Birth Certificate, Aadhaar card, 4 passport photos, previous TC/Report card
3. Scholastic Interaction: Friendly informal assessment of basic concepts
4. Automated Admission & Credential Dispatch: Auto-generated admission number and login passwords sent via SMS & Email
5. Uniform Kit & Syllabus collection from campus counter

### Transport & Facilities:
- 8 GPS-enabled school buses with CCTV, speed governors, and female/male attendants
- Fixed transport charge: ₹500/month across all 8 routes (Giridih Town, Pachamba Chowk, Barmasia, Naitand & Bandiyabad, Jamua Link, etc.)
- 12-acre lush green campus with 24×7 CCTV security
- Smart interactive LED digital classrooms & AI robotics labs
- Science & Computer laboratories, library, and sports grounds

### Contact Details:
- Direct Helpline & WhatsApp: +91 9162789001
- Campus Address: Village Naitand, Post Jamua, Giridih, Jharkhand
- Founded: 2013 (13+ years of educational excellence, 2,500+ students, 100% Board Pass Rate)

## Guidelines:
1. ONLY answer questions related to LBMDPS, admissions, academics, fees, and school facilities.
2. For unrelated questions (like movies, general coding, politics), politely decline and offer to help with school admissions.
3. Always provide the official helpline (+91 9162789001) whenever parents request a callback or phone support.`;

// Maintain per-session chat histories (in-memory, keyed by sessionId)
const chatSessions = new Map();
const tutorSessions = new Map();
const tutorBlocks = new Map();
const MAX_SESSIONS = 500;
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes
const TUTOR_BLOCK_MS = 5 * 60 * 1000;

function cleanupSessions() {
  const now = Date.now();
  for (const [key, session] of chatSessions) {
    if (now - session.lastUsed > SESSION_TTL_MS) {
      chatSessions.delete(key);
    }
  }
  for (const [key, session] of tutorSessions) {
    if (now - session.lastUsed > SESSION_TTL_MS) tutorSessions.delete(key);
  }
  for (const [key, block] of tutorBlocks) {
    if (now >= block.blockedUntil) tutorBlocks.delete(key);
  }
}

setInterval(cleanupSessions, 5 * 60 * 1000);

// Models to try in priority order
const CANDIDATE_MODELS = [...new Set([
  process.env.GEMINI_STUDENT_TUTOR_MODEL,
  process.env.GEMINI_CHAT_MODEL,
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
  'gemini-3.6-flash',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash'
].filter(Boolean))];

/**
 * POST /api/ai/chat
 * Body: { message: string, sessionId?: string }
 * Returns: { ok: true, reply: string, sessionId: string }
 */
router.post('/chat', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: 'Gemini API key is not configured in server .env'
      });
    }

    const { message, sessionId } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ ok: false, error: 'Message is required.' });
    }

    const query = message.trim();
    const sid = sessionId || `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const genAI = new GoogleGenerativeAI(apiKey);

    // Retrieve or create chat session history
    let sessionData = chatSessions.get(sid);
    if (!sessionData) {
      if (chatSessions.size >= MAX_SESSIONS) {
        cleanupSessions();
        if (chatSessions.size >= MAX_SESSIONS) {
          const oldestKey = chatSessions.keys().next().value;
          chatSessions.delete(oldestKey);
        }
      }
      sessionData = { history: [], lastUsed: Date.now() };
      chatSessions.set(sid, sessionData);
    }
    sessionData.lastUsed = Date.now();

    let reply = null;
    let lastError = null;

    // Try candidate models in order until one succeeds
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SCHOOL_SYSTEM_PROMPT,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
        }, { timeout: 15000 });

        const chat = model.startChat({
          history: sessionData.history,
        });

        const result = await chat.sendMessage(query);
        const responseText = result.response.text();
        if (responseText && responseText.trim()) {
          reply = responseText.trim();
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`[Gemini] Model ${modelName} failed, trying next fallback:`, err.message);
        if (err.status === 401 || err.status === 403 || err.status === 429 ||
            /API_KEY_INVALID|API key not valid|PERMISSION_DENIED|RESOURCE_EXHAUSTED|fetch failed/i.test(err.message || '')) break;
      }
    }

    if (!reply) {
      throw lastError || new Error('All Gemini candidate models failed to produce a response');
    }

    // Save to session history for context continuity
    sessionData.history.push(
      { role: 'user', parts: [{ text: query }] },
      { role: 'model', parts: [{ text: reply }] }
    );

    // Keep history manageable (last 20 turns = 40 entries)
    if (sessionData.history.length > 40) {
      sessionData.history = sessionData.history.slice(-40);
    }

    return res.json({ ok: true, reply, sessionId: sid });
  } catch (err) {
    console.error('Gemini AI Chat Error:', err);
    return res.status(500).json({
      ok: false,
      error: err.message || 'AI service unavailable',
      fallback: true
    });
  }
});

const STUDENT_TUTOR_PROMPT = `You are LBMDPS Study Coach, a patient tutor for Class 6–12 students. Help students learn by analyzing their typed question or uploaded question photo.

Teaching rules:
- First explain what the question means in simple language so the student understands what they are being asked to do.
- When useful, organize the explanation under: “Question in simple words”, “What is given / what to find”, and “Concept to use”. Explain unfamiliar command words such as prove, compare, factorise, or derive.
- For an uploaded photo, read the visible question and restate it. If any part is unclear, say what you can read and ask for a clearer or closer photo; never guess missing text.
- After explaining the question, give a useful first hint or next step and invite the student to try it. If the student shares an attempt, explain one correction or next step at a time.
- Never provide a complete answer, final numeric result, full essay, or ready-to-submit solution. For multiple-choice questions, explain the idea and guide the student to compare choices without naming the correct option.
- Reply in the student's language, including simple Hinglish when they use Roman Hindi. Use short sentences and explain difficult words.
- Stay focused on school subjects and learning. Be respectful, encouraging, concise, and age-appropriate.
- Do not claim that you have notified a teacher or saved work in school records.`;

function getTutorStudentKey(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) return `ip:${req.ip}`;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    if (payload.role && payload.role !== 'student' && payload.role !== 'super_admin') return null;
    return `student:${payload.sub || payload.username || req.ip}`;
  } catch (error) {
    if (/^demo-(?:token|quick-token)-/.test(token)) return `ip:${req.ip}`;
    return null;
  }
}

function containsAbusiveLanguage(text) {
  const normalized = String(text || '').normalize('NFKC').toLowerCase();
  const prohibitedTerms = [
    /\bf+u+c+k+\b/i, /\bs+h+i+t+\b/i, /\bb+i+t+c+h+\b/i,
    /\ba+s+s+h+o+l+e\b/i, /\bb+a+s+t+a+r+d\b/i, /\bm+o+t+h+e+r+f+u+c+k+e+r\b/i,
    /\bm+a+d+a+r+c+h+o+d\b/i, /\bb+h+e+n+c+h+o+d\b/i, /\bc+h+u+t+i+y+a\b/i,
    /\br+a+n+d+i\b/i, /\bg+a+a+n+d\b/i
  ];
  return prohibitedTerms.some(pattern => pattern.test(normalized));
}

router.post('/student-tutor', async (req, res) => {
  const studentKey = getTutorStudentKey(req);
  if (!studentKey) return res.status(401).json({ ok: false, error: 'Please sign in with a student account to use Study Coach.' });

  const now = Date.now();
  const currentBlock = tutorBlocks.get(studentKey);
  if (currentBlock && now < currentBlock.blockedUntil) {
    return res.status(429).json({
      ok: false,
      blocked: true,
      lockUntil: new Date(currentBlock.blockedUntil).toISOString(),
      error: 'Study Coach is temporarily paused. Please try again after the short safety break.'
    });
  }

  const { message, imageData, sessionId } = req.body || {};
  const query = typeof message === 'string' ? message.trim() : '';
  if (query.length > 3000) return res.status(413).json({ ok: false, error: 'Please keep a question under 3,000 characters.' });
  if (!query && !imageData) return res.status(400).json({ ok: false, error: 'Type a question or attach a question photo.' });

  if (containsAbusiveLanguage(query)) {
    const blockedUntil = now + TUTOR_BLOCK_MS;
    tutorBlocks.set(studentKey, { blockedUntil });
    if (sessionId) tutorSessions.delete(`${studentKey}:${sessionId}`);
    return res.status(403).json({
      ok: false,
      blocked: true,
      lockUntil: new Date(blockedUntil).toISOString(),
      error: 'Study Coach has ended this chat for a short safety break. It will unlock in five minutes.'
    });
  }

  let imagePart = null;
  if (imageData) {
    if (typeof imageData !== 'string' || imageData.length > 2_000_000) {
      return res.status(413).json({ ok: false, error: 'Question photo is too large. Please choose a smaller image.' });
    }
    const match = imageData.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/i);
    if (!match) return res.status(400).json({ ok: false, error: 'Upload a JPG, PNG, or WebP question photo.' });
    imagePart = { inlineData: { mimeType: match[1].toLowerCase(), data: match[2] } };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ ok: false, error: 'Study Coach AI is not configured on the server yet.' });

  const safeSessionId = String(sessionId || `tutor-${now}-${Math.random().toString(36).slice(2, 8)}`).slice(0, 100);
  const sessionKey = `${studentKey}:${safeSessionId}`;
  let sessionData = tutorSessions.get(sessionKey);
  if (!sessionData) {
    if (tutorSessions.size >= MAX_SESSIONS) cleanupSessions();
    sessionData = { history: [], lastUsed: now };
    tutorSessions.set(sessionKey, sessionData);
  }
  sessionData.lastUsed = now;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const promptParts = [];
    if (query) promptParts.push({ text: query });
    if (imagePart) promptParts.push(imagePart);
    if (query && imagePart) promptParts[0].text += '\nPlease analyze the attached question image too.';

    let reply = '';
    let lastError = null;
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: STUDENT_TUTOR_PROMPT,
          generationConfig: { temperature: 0.35, topP: 0.85, maxOutputTokens: 460 }
        }, { timeout: 15000 });
        const chat = model.startChat({ history: sessionData.history });
        const result = await chat.sendMessage(promptParts);
        reply = result.response.text().trim();
        if (reply) break;
        lastError = new Error(`${modelName} returned an empty response`);
      } catch (error) {
        lastError = error;
        console.warn(`[Study Coach] ${modelName} failed (${error.status || 'unknown'}): ${error.message}`);
        // Credentials, quota, and network failures affect every model; model
        // timeouts can still fall back to a faster available model.
        if (error.status === 401 || error.status === 403 || error.status === 429 ||
            /API_KEY_INVALID|API key not valid|PERMISSION_DENIED|RESOURCE_EXHAUSTED|fetch failed/i.test(error.message || '')) {
          break;
        }
      }
    }
    if (!reply) throw lastError || new Error('No configured Gemini model returned a response.');

    sessionData.history.push(
      { role: 'user', parts: [{ text: query || 'Please analyze the attached school question image.' }] },
      { role: 'model', parts: [{ text: reply }] }
    );
    if (sessionData.history.length > 20) sessionData.history = sessionData.history.slice(-20);
    return res.json({ ok: true, reply, sessionId: safeSessionId });
  } catch (error) {
    const providerMessage = String(error.message || '');
    console.error('Student tutor AI error:', providerMessage);
    const apiKeyFailure = /API_KEY_INVALID|API key not valid|PERMISSION_DENIED|API key expired/i.test(providerMessage);
    const quotaFailure = /RESOURCE_EXHAUSTED|quota|rate.?limit/i.test(providerMessage);
    const userMessage = apiKeyFailure
      ? 'Study Coach server configuration needs attention. Please ask the school administrator to check the Gemini API key and model access.'
      : quotaFailure
        ? 'Study Coach is temporarily busy. Please wait a minute and try again.'
        : 'Study Coach could not connect to an available AI model. Please try again shortly; if it continues, ask the school administrator to check the server logs.';
    return res.status(503).json({ ok: false, error: userMessage });
  }
});

module.exports = router;
