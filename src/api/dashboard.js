const API_URL = "http://localhost:5000/dashboard";

function getToken() {
  return localStorage.getItem("accessToken") || localStorage.getItem("token");
}

export async function getDashboard() {
  const token = getToken();

  if (!token) {
    return { success: false, status: 401 };
  }

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    return { success: false, status: 401 };
  }

  const data = await response.json();
  return data;
}
