const API = "http://localhost:5000/api/tags";

export async function getTags() {
  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token");

  const response = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}