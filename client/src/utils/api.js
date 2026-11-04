// Base URL for Backend API
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://lal-bihari-mahto-divine-public-school-1.onrender.com'
    : '');

export function apiUrl(path) {
  if (!path) return API_BASE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = (API_BASE_URL || '').replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${cleanPath}` : cleanPath;
}

export async function adminLogin(username, password) {
  const resp = await fetch(apiUrl('/api/admin/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return parseResponse(resp);
}

export async function fetchPublicContent(key) {
  const resp = await fetch(apiUrl(`/api/content/${encodeURIComponent(key)}`));
  return parseResponse(resp);
}

export async function fetchAdminContent(key, token) {
  const resp = await fetch(apiUrl(`/api/admin/content/${encodeURIComponent(key)}`), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return parseResponse(resp);
}

export async function saveAdminContent(key, json, token) {
  const resp = await fetch(apiUrl(`/api/admin/content/${encodeURIComponent(key)}`), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ json }),
  });
  return parseResponse(resp);
}

export async function uploadImage(file, token) {
  const formData = new FormData();
  formData.append('file', file);
  const resp = await fetch(apiUrl('/api/admin/upload-image'), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return parseResponse(resp);
}

export async function fetchApplications() {
  const resp = await fetch(apiUrl('/api/applications'));
  return parseResponse(resp);
}

// -----------------------------------------------------------------------------
// Real Database Portal APIs (Student & Parent Real Data Binding)
// -----------------------------------------------------------------------------
export async function fetchStudentPortalData(token, admissionNo) {
  const url = admissionNo ? `/api/student/me?admissionNo=${encodeURIComponent(admissionNo)}` : '/api/student/me';
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const resp = await fetch(apiUrl(url), { headers });
  return parseResponse(resp);
}

export async function submitHomeworkSolution(assignmentId, payload, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const resp = await fetch(apiUrl(`/api/student/assignments/${encodeURIComponent(assignmentId)}/submit`), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return parseResponse(resp);
}

export async function fetchParentPortalData(token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const resp = await fetch(apiUrl('/api/parent/me'), { headers });
  return parseResponse(resp);
}

export async function payFeeVoucher(payload, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const resp = await fetch(apiUrl('/api/parent/fees/pay'), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return parseResponse(resp);
}

export async function submitStudentLeave(payload, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const resp = await fetch(apiUrl('/api/parent/leave'), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return parseResponse(resp);
}

// -----------------------------------------------------------------------------
// Automated Student Enrollment Workflow API
// -----------------------------------------------------------------------------
export async function enrollStudentWorkflow(payload) {
  const resp = await fetch(apiUrl('/api/admissions/enroll'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return parseResponse(resp);
}

export async function fetchEnrollmentList() {
  const resp = await fetch(apiUrl('/api/admissions/enrollments'));
  return parseResponse(resp);
}

// -----------------------------------------------------------------------------
// Super Admin Staff (Teacher) Manual Provisioning API
// -----------------------------------------------------------------------------
export async function provisionStaffAccount(payload, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const resp = await fetch(apiUrl('/api/admin/staff/provision'), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return parseResponse(resp);
}

export async function fetchStaffMembers(token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const resp = await fetch(apiUrl('/api/admin/staff'), { headers });
  return parseResponse(resp);
}

// -----------------------------------------------------------------------------
// 24/7 AI Chatbot CRM Lead Real-Time Sync API
// -----------------------------------------------------------------------------
export async function syncCrmLead(payload) {
  const resp = await fetch(apiUrl('/api/crm/leads'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return parseResponse(resp);
}

// -----------------------------------------------------------------------------
// Gemini AI Chat API (Real-Time Intelligent Responses)
// -----------------------------------------------------------------------------
export async function sendAiChat(message, sessionId) {
  const resp = await fetch(apiUrl('/api/ai/chat'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId })
  });
  return parseResponse(resp);
}

export async function sendStudentTutorQuestion(payload, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const resp = await fetch(apiUrl('/api/ai/student-tutor'), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
  return parseResponse(resp);
}

export async function fetchCrmLeads(status, category, token) {
  let url = '/api/crm/leads';
  const params = [];
  if (status) params.push(`status=${encodeURIComponent(status)}`);
  if (category) params.push(`category=${encodeURIComponent(category)}`);
  if (params.length > 0) url += `?${params.join('&')}`;

  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const resp = await fetch(apiUrl(url), { headers });
  return parseResponse(resp);
}

export async function updateCrmLeadStatus(leadId, payload, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const resp = await fetch(apiUrl(`/api/crm/leads/${encodeURIComponent(leadId)}`), {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload)
  });
  return parseResponse(resp);
}

async function parseResponse(resp) {
  const payload = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const error = new Error(payload.error || 'Server error');
    error.status = resp.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}
