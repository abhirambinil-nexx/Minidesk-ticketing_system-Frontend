const API_URL = "http://localhost:5000/tickets";

function getToken() {
  return localStorage.getItem("token");
}

export async function getHistory(ticketId) {
  const response = await fetch(
    `${API_URL}/${ticketId}/history`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return await response.json();
}