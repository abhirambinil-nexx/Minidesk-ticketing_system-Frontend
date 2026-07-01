const API_URL = "http://localhost:5000/tickets";

function getToken() {
  return localStorage.getItem("token");
}

export async function getComments(ticketId) {
  const response = await fetch(`${API_URL}/${ticketId}/comments`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}

export async function createComment(ticketId, body) {
  const response = await fetch(`${API_URL}/${ticketId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      body,
    }),
  });

  return await response.json();
}