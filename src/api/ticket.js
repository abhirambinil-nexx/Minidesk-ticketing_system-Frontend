const API_URL = "http://localhost:5000/api/tickets";

function getToken() {
  return localStorage.getItem("accessToken") || localStorage.getItem("token");
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
    ...options,
  });

  return await response.json();
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
  return requestJson(`${API_URL}/${id}`);
}

export async function getTicketDetails(id) {
  return requestJson(`${API_URL}/${id}`);
}

export async function updateTicketDetails(id, ticket) {
  return requestJson(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(ticket),
  });
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
  return requestJson(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(ticket),
  });
}

export async function getTicketComments(ticketId) {
  return requestJson(`${API_URL}/${ticketId}/comments`);
}

export async function createComment(ticketId, body) {
  return requestJson(`${API_URL}/${ticketId}/comments`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
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

// =============================================
// Get Tickets By Space
// =============================================

export async function getSpaceTickets(key, filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([k, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(k, value);
    }
  });

  const response = await fetch(
    `http://localhost:5000/api/spaces/${key}/tickets?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return await response.json();
}
