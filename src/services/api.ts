const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function handle401Check(response: Response) {
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }
  }
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

  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
}

export async function getDashboard() {
  const response = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    handle401Check(response);
    throw new Error("Unauthorized - Please log in again");
  }

  if (!response.ok) throw new Error("Failed to fetch dashboard");

  return response.json();
}

export async function getTransactions() {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    handle401Check(response);
    throw new Error("Unauthorized - Please log in again");
  }

  if (!response.ok) throw new Error("Failed to fetch transactions");

  return response.json();
}

export async function getRecommendations() {
  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    handle401Check(response);
    throw new Error("Unauthorized - Please log in again");
  }

  if (!response.ok) throw new Error("Failed to fetch recommendations");

  return response.json();
}

export async function getAlerts() {
  const response = await fetch(`${API_BASE_URL}/alerts`, {
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    handle401Check(response);
    throw new Error("Unauthorized - Please log in again");
  }

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

  if (response.status === 401) {
    handle401Check(response);
    throw new Error("Unauthorized - Please log in again");
  }

  if (!response.ok) throw new Error("Chat request failed");

  return response.json();
}

// Aliases to maintain backwards compatibility if components call sendMessage
export const sendMessage = (message: string, language: string = "en") => sendChatMessage(message, language);
