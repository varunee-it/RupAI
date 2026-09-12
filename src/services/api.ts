const API_BASE_URL = "http://10.200.29.139:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  return response.json();
}

export async function getDashboard() {
  const response = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch dashboard");

  return response.json();
}

export async function getTransactions() {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch transactions");

  return response.json();
}

export async function getRecommendations() {
  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch recommendations");

  return response.json();
}

export async function getAlerts() {
  const response = await fetch(`${API_BASE_URL}/alerts`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch alerts");

  return response.json();
}

export async function sendChatMessage(message: string, language: string = "en") {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      message,
      language,
    }),
  });

  if (!response.ok) throw new Error("Chat request failed");

  return response.json();
}

// Aliases to maintain backwards compatibility if components call sendMessage
export const sendMessage = (message: string, language: string = "en") => sendChatMessage(message, language);
