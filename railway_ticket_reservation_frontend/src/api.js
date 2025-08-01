//
// API helper utilities
//
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// PUBLIC_INTERFACE
export async function apiGet(endpoint, token) {
  const res = await fetch(API_BASE_URL + endpoint, {
    headers: token
      ? { "Authorization": `Bearer ${token}` }
      : {},
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiPost(endpoint, data, token) {
  const res = await fetch(API_BASE_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
