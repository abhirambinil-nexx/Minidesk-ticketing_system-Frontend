const API_URL = "http://localhost:5000/api/tickets";

function getToken() {
  return localStorage.getItem("token");
}

export async function getTickets(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
  
export async function getTicket(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}

export async function createTicket(ticket) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(ticket),
  });

  return await response.json();
}

export async function updateTicket(id, ticket) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(ticket),
  });

  return await response.json();
}

export async function deleteTicket(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
