async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    credentials: 'same-origin', ...options,
    headers: { 'Content-Type': 'application/json', 'X-CodeForge-Request': '1', ...options.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(body.message || 'Request failed. Please try again.'), { status: response.status });
  return body;
}
const post = (path, data = {}) => request(path, { method: 'POST', body: JSON.stringify(data) });
export const api = {
  learningCore: {
    catalog: () => request('/learning-core/catalog'),
    progress: () => request('/learning-core/progress'),
    start: (data) => post('/learning-core/attempts',data),
    detail: (id) => request('/learning-core/attempts/'+encodeURIComponent(id)),
    action: (id,action,data) => post('/learning-core/attempts/'+encodeURIComponent(id)+'/'+action,data),
    queue: () => request('/learning-core/review-queue'),
    definitions: () => request('/learning-core/definitions'),
    saveDefinition: (definition) => post('/learning-core/definitions',{definition}),
    publish: (id,version,state) => post('/learning-core/definitions/'+encodeURIComponent(id)+'/'+encodeURIComponent(version),{state}),
    certificates: () => request('/learning-core/certificates'),
    consent: (definitionId,allowPublicVerification) => post('/learning-core/certificate-consent',{definitionId,allowPublicVerification}),
    document: (id) => request('/learning-core/certificates/'+encodeURIComponent(id)+'/document'),
    verify: (id) => request('/certificates/verify/'+encodeURIComponent(id)),
  },
  curriculum: () => request('/curriculum'),
  learning: { focus: () => request('/learning/focus'), setFocus: (milestone) => request('/learning/focus', { method: 'PUT', body: JSON.stringify({ milestone }) }) },
  projects: { list: () => request('/projects'), importGithub: (url, confirmRights) => post('/projects/github', { url, confirmRights }) },
  config: () => request('/config'),
  preview: (files) => post('/preview', { files }),
  account: {
    export: (password) => post('/account/export', { password }),
    delete: (password, confirmation) => request('/account', { method: 'DELETE', body: JSON.stringify({ password, confirmation }) }),
  },
  support: { create: (data) => post('/support', data), list: () => request('/support') },
  auth: {
    me: () => request('/auth/me'),
    register: (data) => post('/auth/register', data),
    login: (email, password) => post('/auth/login', { email, password }),
    verify: (data) => post('/auth/verify', data),
    resend: (email) => post('/auth/resend', { email }),
    resetRequest: (email) => post('/auth/reset-request', { email }),
    reset: (data) => post('/auth/reset', data),
    logout: () => post('/auth/logout'),
  },
  profile: { update: (data) => request('/profile', { method: 'PATCH', body: JSON.stringify(data) }) },
  workspace: {
    load: () => request('/workspace'),
    save: (data, revision) => request('/workspace', { method: 'PUT', body: JSON.stringify({ data, revision }) }),
  },
};
