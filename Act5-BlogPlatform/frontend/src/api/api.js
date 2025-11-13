// frontend/src/api/api.js
const API_URL = 'http://localhost:3000';

export async function api(path, { method = 'GET', body, token, headers = {} } = {}) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
  };
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_URL}${path}`, opts);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
