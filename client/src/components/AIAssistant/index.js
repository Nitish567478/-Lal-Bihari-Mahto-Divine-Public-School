import React, { useState, useEffect, useRef } from 'react';
import { 
  IoSend, 
  IoSparkles, 
  IoClose, 
  IoRefresh, 
  IoCallOutline 
} from 'react-icons/io5';
import logo from '../AllImage/school-logo.jpg';
import { syncCrmLead, sendAiChat } from '../../utils/api';
import './index.css';

const INITIAL_GREETING = {
  id: 'msg-0',
  sender: 'bot',
  text: `Namaste! 🙏 Welcome to Lal Bihari Mahto Divine Public School (LBMDPS), Naitand, Giridih.\n\nI am your 24/7 AI Admissions Counselor. Ask me anything about the **2026–2027 CBSE admission session**, fee structures, age cutoffs, bus routes, or school facilities.\n\nSelect a topic or type your query below:`,
  chips: [
    '💰 Fee Structure 2026–27',
    '📅 Age & Eligibility Cutoffs',
    '📝 5-Step Admission Process',
    '🚌 Bus Routes & Transport Fee',
    '📞 Request Callback'
  ]
};

// Fallback knowledge base when Gemini is offline
const KNOWLEDGE_RESPONSES = [
  {
    keywords: ['fee', 'fees', 'cost', 'charge', 'installment', 'tuition', 'quarterly'],
    category: 'Fee Structure & Installments',
    reply: `Here is the approved CBSE Fee Structure for Academic Session 2026–2027:\n\n• **Pre-Primary Wing (Nursery, LKG, UKG):** Admission Fee ₹2,500 (one-time) • Monthly Tuition ₹1,050 • Quarterly Composite ₹3,150\n• **Primary Wing (Class 1 to 5):** Admission Fee ₹3,000 (one-time) • Monthly Tuition ₹1,250 • Quarterly Composite ₹3,750\n• **Middle Wing (Class 6 to 8):** Admission Fee ₹3,500 (one-time) • Monthly Tuition ₹1,450 • Quarterly Composite ₹4,350\n• **Secondary Wing (Class 9 & 10):** Admission Fee ₹4,000 (one-time) • Monthly Tuition ₹1,650 • Quarterly Composite ₹4,950\n• **Optional Bus Transport:** ₹500 / month across 8 verified routes in Giridih.\n\n*Would you like to request an official callback or fee brochure?*`,
    chips: ['📅 Age & Eligibility Cutoffs', '📝 5-Step Admission Process', '📞 Request Callback']
  },
  {
    keywords: ['age', 'eligib', 'criteria', 'cut off', 'cutoff', 'minimum age', 'class 1 age'],
    category: 'Eligibility & Age Criteria',
    reply: `Here are the official Age & Eligibility Guidelines as per CBSE and NEP 2020 (as of 31st March 2026):\n\n• **Nursery:** Minimum 3+ years completed\n• **L.K.G:** Minimum 4+ years completed\n• **U.K.G:** Minimum 5+ years completed\n• **Class 1:** Minimum 6+ years completed\n• **Classes 2 to 9:** Passed previous class from a recognized board; original Transfer Certificate (TC) & previous report card required.\n• **Class 10:** Direct admission permitted per CBSE regional transfer / transfer of parent norms with prerequisite merit verification.\n\n*Which class are you planning admission for?*`,
    chips: ['💰 Fee Structure 2026–27', '📝 5-Step Admission Process', '📞 Request Callback']
  },
  {
    keywords: ['process', 'how to apply', 'enroll', 'admission process', 'step', 'documents', 'document', 'registration', 'join'],
    category: 'Direct Enrollment & Document Support',
    reply: `Our 5-Step Streamlined Admission Journey:\n\n1. **Online Inquiry / Campus Registration:** Fill out the online application or visit our Naitand administrative desk.\n2. **Document Submission:** Submit Child's Birth Certificate, Aadhaar card, 4 passport photos, and previous class TC/Report Card.\n3. **Scholastic Interaction:** Friendly, informal assessment of fundamental language and numeracy concepts.\n4. **Automated Admission & Credential Dispatch:** Upon confirmation, the system auto-generates a non-sequential Admission Number (e.g. LBM-2026-XXXXX) and dispatches student/parent login passwords via SMS and Email.\n5. **First Installment Settlement & Uniform Kit:** Collect syllabus books and uniform vouchers from our campus counter.\n\n*Would you like to initiate registration or schedule a campus visit?*`,
    chips: ['📞 Request Callback', '💰 Fee Structure 2026–27', '🚌 Bus Routes & Transport Fee']
  },
  {
    keywords: ['bus', 'transport', 'route', 'van', 'stop', 'pick', 'pachamba', 'jamua', 'hostel', 'mess'],
    category: 'Transport & Hostel Facilities',
    reply: `Campus Transport & Boarding Facilities:\n\n• **School Buses:** 8 dedicated, GPS-enabled buses with speed governors, CCTV surveillance, and verified conductor attendants.\n• **Key Pickup Corridors:** Route #1 Giridih Town, Route #2 Pachamba Chowk, Route #3 Barmasia, Route #4 Naitand & Bandiyabad, Route #5 Jamua Link.\n• **Transport Charges:** Fixed ₹500/month across all standard radius stoppage zones.\n• **Campus Facilities:** 12-acre campus, science & AI robotics labs, sports grounds, and guest house for visiting guardians.\n\n*Would you like transport stoppage details for your locality?*`,
    chips: ['💰 Fee Structure 2026–27', '📝 5-Step Admission Process', '📞 Request Callback']
  },
  {
    keywords: ['timing', 'time', 'hours', 'open', 'close', 'samay'],
    category: 'General Academic Inquiry',
    reply: `Official School & Admissions Timings:\n\n• **Student Class Hours:** Monday to Saturday, 08:00 AM – 02:30 PM\n• **Admissions & Office Desk:** Monday to Saturday, 08:00 AM – 04:00 PM\n• **Sunday:** Closed\n\n*Feel free to call our admissions desk directly at +91 9162789001.*`,
    chips: ['💰 Fee Structure 2026–27', '📝 5-Step Admission Process', '📞 Request Callback']
  },
  {
    keywords: ['callback', 'call', 'contact', 'number', 'phone', 'talk', 'admissions officer', 'speak'],
    category: 'Direct Enrollment & Document Support',
    reply: `I would be happy to connect you directly with our Admissions Desk! 📞\n\nPlease share your **Mobile Number**, **Parent Name**, and **Target Class** below, and our senior admission counselor will call you within 15 minutes during school hours (08:00 AM – 04:00 PM).\n\nDirect Helpline: +91 9162789001`,
    chips: ['📝 5-Step Admission Process', '💰 Fee Structure 2026–27']
  }
];

// ---------------------------------------------------------------------------
// Markdown Parser & Formatter for Modern AI Messages
// ---------------------------------------------------------------------------
function formatInlineText(text) {
  if (!text) return null;

  // Split by bold (**bold text**)
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={idx} className="ai-text-bold">
          {boldContent}
        </strong>
      );
    }
    // Check for phone number
    if (part.includes('9162789001')) {
      const subParts = part.split('9162789001');
      return (
        <React.Fragment key={idx}>
          {subParts.map((sp, pIdx) => (
            <React.Fragment key={pIdx}>
              {sp}
              {pIdx < subParts.length - 1 && (
                <a href="tel:+919162789001" className="ai-phone-chip" title="Call LBMDPS Admissions Desk">
                  <IoCallOutline /> +91 9162789001
                </a>
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }
    return part;
  });
}

function FormattedMessage({ text }) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let currentList = [];
  let listType = null; // 'numbered' or 'bullet'

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === 'numbered') {
        elements.push(
          <div key={`num-list-${elements.length}`} className="ai-steps-container">
            {currentList.map((item, i) => (
              <div key={i} className="ai-step-card">
                <div className="ai-step-badge">{item.num}</div>
                <div className="ai-step-content">{formatInlineText(item.text)}</div>
              </div>
            ))}
          </div>
        );
      } else if (listType === 'bullet') {
        elements.push(
          <div key={`bullet-list-${elements.length}`} className="ai-bullets-container">
            {currentList.map((item, i) => (
              <div key={i} className="ai-bullet-item">
                <span className="ai-bullet-icon"></span>
                <span className="ai-bullet-text">{formatInlineText(item.text)}</span>
              </div>
            ))}
          </div>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    // Numbered step (e.g. "1. **Admission**" or "1. Step")
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (listType !== 'numbered') flushList();
      listType = 'numbered';
      currentList.push({ num: numMatch[1], text: numMatch[2] });
      return;
    }

    // Bullet point (e.g. "• Item" or "* Item" or "- Item")
    const bulletMatch = trimmed.match(/^([•*-])\s+(.*)/);
    if (bulletMatch) {
      if (listType !== 'bullet') flushList();
      listType = 'bullet';
      currentList.push({ text: bulletMatch[2] });
      return;
    }

    // Regular line / paragraph
    flushList();
    elements.push(
      <p key={`p-${index}`} className="ai-message-para">
        {formatInlineText(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className="ai-formatted-wrapper">{elements}</div>;
}

// ---------------------------------------------------------------------------
// Main Modern AI Assistant Component
// ---------------------------------------------------------------------------
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiSessionId, setAiSessionId] = useState(null);

  // Quick Lead Capture state inside the assistant
  const [leadForm, setLeadForm] = useState({
    parentName: '',
    phone: '',
    targetClass: 'Class 1'
  });
  const [showLeadPrompt, setShowLeadPrompt] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Fallback to local knowledge base when Gemini is unavailable
  const getLocalFallbackReply = (query) => {
    const lower = query.toLowerCase();
    const matched = KNOWLEDGE_RESPONSES.find(item =>
      item.keywords.some(k => lower.includes(k))
    );

    if (matched) {
      return {
        reply: matched.reply,
        chips: matched.chips,
        category: matched.category
      };
    }

    return {
      reply: `Thank you for reaching out to Lal Bihari Mahto Divine Public School (LBMDPS), Giridih (CBSE Affiliation #3430398 • UDISE Code: 20060105502).\n\nWe offer quality education from Pre-Nursery to Class 10 with interactive digital classrooms, experienced faculty, and transport facilities.\n\nOur Admissions Office at Naitand is open Monday through Saturday (8:00 AM – 4:00 PM).\n\nYou can also contact our counselors directly at **+91 9162789001** for immediate assistance or fee details.`,
      chips: [
        '💰 Fee Structure 2026–27',
        '📅 Age & Eligibility Cutoffs',
        '📝 5-Step Admission Process',
        '📞 Request Callback'
      ],
      category: 'General Academic Inquiry'
    };
  };

  // Determine smart suggestion chips based on AI reply content
  const inferChipsFromReply = (reply) => {
    const lower = reply.toLowerCase();
    const chips = [];

    if (!lower.includes('fee structure') && !lower.includes('tuition')) {
      chips.push('💰 Fee Structure 2026–27');
    }
    if (!lower.includes('age') && !lower.includes('eligib')) {
      chips.push('📅 Age & Eligibility Cutoffs');
    }
    if (!lower.includes('admission process') && !lower.includes('5-step') && !lower.includes('join')) {
      chips.push('📝 5-Step Admission Process');
    }
    if (!lower.includes('bus') && !lower.includes('transport')) {
      chips.push('🚌 Bus Routes & Transport Fee');
    }
    if (!lower.includes('callback') && !lower.includes('9162789001')) {
      chips.push('📞 Request Callback');
    }

    return chips.slice(0, 3);
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const userMessage = { id: `usr-${Date.now()}`, sender: 'user', text: query, time: timeStr };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    let botReply = '';
    let chips = [];
    let intentCategory = 'General Academic Inquiry';
    let usedGemini = false;

    // Try Gemini API first
    try {
      const aiResponse = await sendAiChat(query, aiSessionId);

      if (aiResponse.ok && aiResponse.reply) {
        botReply = aiResponse.reply;
        chips = inferChipsFromReply(botReply);
        usedGemini = true;

        if (aiResponse.sessionId) {
          setAiSessionId(aiResponse.sessionId);
        }

        const lower = query.toLowerCase();
        if (lower.match(/fee|cost|charge|tuition/)) intentCategory = 'Fee Structure & Installments';
        else if (lower.match(/age|eligib|cutoff/)) intentCategory = 'Eligibility & Age Criteria';
        else if (lower.match(/process|enroll|admission|step|document|join/)) intentCategory = 'Direct Enrollment & Document Support';
        else if (lower.match(/bus|transport|route|hostel/)) intentCategory = 'Transport & Hostel Facilities';
        else if (lower.match(/callback|call|contact|phone/)) intentCategory = 'Direct Enrollment & Callback Request';
      } else {
        throw new Error('Empty Gemini response');
      }
    } catch (err) {
      console.warn('Gemini AI unavailable, using local fallback:', err.message);
      const fallback = getLocalFallbackReply(query);
      botReply = fallback.reply;
      chips = fallback.chips;
      intentCategory = fallback.category;
    }

    // Optional silent CRM lead sync when contact info is present
    if (leadForm.phone) {
      try {
        await syncCrmLead({
          parentName: leadForm.parentName || undefined,
          phone: leadForm.phone || undefined,
          targetClass: leadForm.targetClass || undefined,
          intentCategory,
          query,
          transcriptSnippet: `Visitor Query: "${query}" | Intent: ${intentCategory} | AI: ${usedGemini ? 'Gemini' : 'Fallback'}`
        });
      } catch (crmErr) {
        console.warn('Silent CRM sync fallback:', crmErr);
      }
    }

    // Show lead form prompt if query implies callback/contact intent
    const lower = query.toLowerCase();
    if (lower.includes('call') || lower.includes('contact') || lower.includes('phone') || lower.includes('admission') || lower.includes('register') || lower.includes('callback')) {
      setShowLeadPrompt(true);
    }

    setIsTyping(false);
    setMessages(prev => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        chips
      }
    ]);
  };

  const handleChipClick = (chipText) => {
    if (chipText.includes('Callback')) {
      setShowLeadPrompt(true);
    } else {
      handleSendMessage(chipText);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setShowLeadPrompt(false);
    setAiSessionId(null);
  };

  const handleLeadFormSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.phone.trim()) {
      alert('Please enter your mobile phone number.');
      return;
    }

    try {
      setLeadSubmitting(true);
      const res = await syncCrmLead({
        parentName: leadForm.parentName.trim() || 'Prospective Parent',
        phone: leadForm.phone.trim(),
        targetClass: leadForm.targetClass,
        intentCategory: 'Direct Enrollment & Callback Request',
        query: `Direct Callback Request from AI Chatbot for ${leadForm.targetClass}. Parent: ${leadForm.parentName}`,
        transcriptSnippet: `Parent ${leadForm.parentName} requested callback for ${leadForm.targetClass}. Phone: ${leadForm.phone}`
      });

      const leadId = res?.lead?.leadId || `CRM-${Math.floor(10000 + Math.random() * 90000)}`;

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `🎉 Thank you, **${leadForm.parentName || 'Parent'}**! Your callback request has been registered in our Admissions CRM under Lead ID **#${leadId}**.\n\nOur Senior Counselor will reach you at **${leadForm.phone}** shortly.\n\n• School Helpline: +91 9162789001\n• Campus: Village Naitand, Giridih.`,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          chips: ['💰 Fee Structure 2026–27', '📝 5-Step Admission Process']
        }
      ]);

      setShowLeadPrompt(false);
      setLeadForm({ parentName: '', phone: '', targetClass: 'Class 1' });
    } catch (err) {
      console.error('Lead submission error:', err);
      alert('Thank you! Your inquiry was registered.');
      setShowLeadPrompt(false);
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div className="ai-assistant-wrapper">
      {/* Floating Circular Launcher Button: Only School Logo with Electric Violet & Magenta Halo */}
      {!isOpen && (
        <button
          className="ai-logo-launcher-btn"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open 24/7 AI Admissions Assistant"
          title="LBMDPS 24/7 AI Admissions Counselor"
        >
          <img src={logo} alt="LBMDPS Crest" className="ai-launcher-logo-img" />
          <span className="ai-launcher-pulse-ring"></span>
        </button>
      )}

      {/* Modern High-End AI Chat Window */}
      {isOpen && (
        <div className="ai-chatbot-window">
          {/* Glassmorphic Electric Violet & Vivid Magenta AI Header */}
          <div className="ai-chatbot-header">
            <div className="ai-header-brand">
              <div className="ai-avatar-wrapper">
                <img src={logo} alt="LBMDPS Crest" className="ai-brand-crest" />
                <span className="ai-avatar-online-dot"></span>
              </div>
              <div className="ai-brand-text">
                <div className="ai-brand-title">
                  <strong>LBMDPS Admissions AI</strong>
                </div>
                <div className="ai-brand-subtitle">
                  CBSE Affiliated #3430398 • UDISE 20060105502
                </div>
              </div>
            </div>

            <div className="ai-header-controls">
              <span className="ai-pill-tag" title="Admissions AI operates 24/7">
                <IoSparkles className="ai-pill-sparkle" /> 24/7 LIVE
              </span>
              <button
                type="button"
                className="ai-ctrl-btn reset-btn"
                onClick={handleResetChat}
                title="Reset Conversation"
                aria-label="Reset Conversation"
              >
                <IoRefresh />
              </button>
              <button
                type="button"
                className="ai-ctrl-btn close-btn"
                onClick={() => setIsOpen(false)}
                title="Minimize AI Assistant"
                aria-label="Minimize AI Assistant"
              >
                <IoClose />
              </button>
            </div>
          </div>

          {/* Clean, Spacious & Structured Chat Body */}
          <div className="ai-chatbot-body">
            {messages.map((m) => (
              <div key={m.id} className={`ai-message-row ${m.sender}`}>
                {m.sender === 'bot' && (
                  <div className="ai-message-avatar">
                    <img src={logo} alt="Bot" />
                  </div>
                )}
                <div className="ai-bubble-container">
                  <div className={`ai-message-bubble ${m.sender}`}>
                    <FormattedMessage text={m.text} />
                  </div>

                  {/* Sleek Suggestion Chips */}
                  {m.chips && m.chips.length > 0 && (
                    <div className="ai-chips-wrap">
                      {m.chips.map((chip, i) => (
                        <button
                          key={i}
                          type="button"
                          className="ai-quick-chip"
                          onClick={() => handleChipClick(chip)}
                        >
                          <span className="ai-chip-text">{chip}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Modern Clean Typing Indicator */}
            {isTyping && (
              <div className="ai-message-row bot">
                <div className="ai-message-avatar">
                  <img src={logo} alt="Bot" />
                </div>
                <div className="ai-typing-bubble">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            {/* In-Chat Callback Request Card */}
            {showLeadPrompt && (
              <div className="ai-inline-lead-card">
                <div className="lead-card-header">
                  <div className="lead-card-icon">
                    <IoCallOutline />
                  </div>
                  <div>
                    <strong>Request Admissions Callback</strong>
                    <p>Our counselor will call you within 15 minutes with the prospectus.</p>
                  </div>
                </div>
                <form onSubmit={handleLeadFormSubmit}>
                  <div className="lead-input-group">
                    <input
                      type="text"
                      placeholder="Parent's Legal Name"
                      value={leadForm.parentName}
                      onChange={(e) => setLeadForm({ ...leadForm, parentName: e.target.value })}
                    />
                  </div>
                  <div className="lead-input-group">
                    <input
                      type="tel"
                      placeholder="Mobile Phone Number *"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="lead-input-group">
                    <select
                      value={leadForm.targetClass}
                      onChange={(e) => setLeadForm({ ...leadForm, targetClass: e.target.value })}
                    >
                      <option value="Pre-Nursery / Nursery">Pre-Nursery / Nursery</option>
                      <option value="L.K.G / U.K.G">L.K.G / U.K.G</option>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="lead-form-actions">
                    <button
                      type="button"
                      className="lead-cancel-btn"
                      onClick={() => setShowLeadPrompt(false)}
                    >
                      Dismiss
                    </button>
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="lead-submit-btn"
                    >
                      {leadSubmitting ? 'Submitting...' : '⚡ Submit Callback Request'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Floating High-End Chat Input Capsule */}
          <form
            className="ai-chatbot-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
          >
            <div className="ai-input-box-wrapper">
              <IoSparkles className="ai-input-sparkle" />
              <input
                type="text"
                placeholder="Ask about fees, age criteria, bus routes..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputText);
                  }
                }}
                className="ai-chat-input"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="ai-send-btn"
                aria-label="Send query"
              >
                <IoSend />
              </button>
            </div>
            
          </form>
        </div>
      )}
    </div>
  );
}
