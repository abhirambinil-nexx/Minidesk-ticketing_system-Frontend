const API_URL = "http://localhost:5000/api/users";

function getToken() {
  return localStorage.getItem("accessToken");
}

export async function getUsers() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}

export async function getUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}

export async function getAgents() {
  const response = await fetch(`${API_URL}/agents`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}

export async function createUser(user) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}

export async function updateUser(id, user) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}

export async function changeUserRole(id, role) {
  const response = await fetch(`${API_URL}/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ role }),
  });

  return await response.json();
}

export async function activateUser(id) {
  const response = await fetch(`${API_URL}/${id}/activate`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}

export async function deactivateUser(id) {
  const response = await fetch(`${API_URL}/${id}/deactivate`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
  