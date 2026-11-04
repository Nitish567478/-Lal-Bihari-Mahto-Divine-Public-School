const express = require('express');
const router = express.Router();
const { readStore, writeStore } = require('../utils/fileStore');

/**
 * Categorize intent based on user query keywords
 */
function detectIntentCategory(query = '') {
  const q = query.toLowerCase();
  if (q.includes('fee') || q.includes('cost') || q.includes('charge') || q.includes('installment') || q.includes('tuition')) {
    return 'Fee Structure & Installments';
  }
  if (q.includes('age') || q.includes('eligib') || q.includes('criteria') || q.includes('cut off') || q.includes('class 1')) {
    return 'Eligibility & Age Criteria';
  }
  if (q.includes('bus') || q.includes('transport') || q.includes('hostel') || q.includes('mess')) {
    return 'Transport & Hostel Facilities';
  }
  if (q.includes('document') || q.includes('certificate') || q.includes('aadhaar') || q.includes('tc') || q.includes('apply') || q.includes('enroll')) {
    return 'Direct Enrollment & Document Support';
  }
  return 'General Academic Inquiry';
}

// -----------------------------------------------------------------------------
// POST /api/crm/leads
// Real-time synchronization from 24/7 AI Admission Chatbot
// -----------------------------------------------------------------------------
router.post('/crm/leads', (req, res) => {
  try {
    const {
      parentName,
      phone,
      email,
      targetClass,
      intentCategory,
      query,
      transcriptSnippet
    } = req.body || {};

    if (!phone && !parentName && !query) {
      return res.status(400).json({ ok: false, error: 'Query or contact details are required.' });
    }

    const store = readStore();
    const detectedCategory = intentCategory || detectIntentCategory(query || transcriptSnippet);
    const leadId = `CRM-${Math.floor(10000 + Math.random() * 90000)}`;

    const newLead = {
      leadId,
      source: 'AI_CHATBOT_24_7',
      parentName: parentName ? parentName.trim() : 'Prospective Parent',
      phone: phone ? phone.trim() : 'Phone Not Shared',
      email: email ? email.trim() : 'N/A',
      targetClass: targetClass || 'Class 1 to 10',
      intentCategory: detectedCategory,
      query: query || 'Inquiry through AI Chatbot',
      transcriptSnippet: transcriptSnippet || query || 'Admission query recorded by AI Counselor.',
      priority: (phone && phone.length >= 10) ? 'HIGH' : 'MEDIUM',
      status: 'New Lead',
      alertTriggered: true,
      alertMessage: `🚨 New Prospective Admission Lead (${detectedCategory}): ${parentName || 'Parent'} (${phone || 'Web Visitor'})`,
      createdAt: new Date().toISOString()
    };

    store.crmLeads = [newLead, ...(store.crmLeads || [])];
    writeStore(store);

    console.log(`[CRM Real-Time Sync] Lead captured #${leadId} — ${newLead.intentCategory} for ${newLead.parentName}`);

    res.status(201).json({
      ok: true,
      lead: newLead,
      alertDispatched: true,
      message: 'Lead synchronized with school CRM. Admissions team outreach triggered.'
    });
  } catch (err) {
    console.error('CRM sync error:', err);
    res.status(500).json({ ok: false, error: err.message || 'CRM lead synchronization failed' });
  }
});

// GET /api/crm/leads
router.get('/crm/leads', (req, res) => {
  const store = readStore();
  const { status, category } = req.query;

  let leads = store.crmLeads || [];
  if (status) {
    leads = leads.filter(l => l.status === status);
  }
  if (category) {
    leads = leads.filter(l => l.intentCategory === category);
  }

  res.json({
    ok: true,
    total: leads.length,
    newLeadsCount: leads.filter(l => l.status === 'New Lead').length,
    leads
  });
});

// PATCH /api/crm/leads/:id
router.patch('/crm/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, outreachNotes } = req.body || {};

  const store = readStore();
  const leadIndex = (store.crmLeads || []).findIndex(l => l.leadId === id);

  if (leadIndex < 0) {
    return res.status(404).json({ ok: false, error: 'Lead not found in CRM database' });
  }

  if (status) store.crmLeads[leadIndex].status = status;
  if (outreachNotes) store.crmLeads[leadIndex].outreachNotes = outreachNotes;
  store.crmLeads[leadIndex].updatedAt = new Date().toISOString();

  writeStore(store);

  res.json({
    ok: true,
    lead: store.crmLeads[leadIndex],
    message: 'CRM Lead status updated.'
  });
});

module.exports = router;

