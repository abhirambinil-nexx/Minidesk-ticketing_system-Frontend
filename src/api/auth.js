const API = "http://localhost:5000/auth";
const GOOGLE_API = "http://localhost:5000/api/auth/google";

export async function signup(userData) {
  const response = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

export async function login(userData) {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

export async function googleLogin(idToken) {
  const response = await fetch(GOOGLE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  return response.json();
}
