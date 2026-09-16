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
