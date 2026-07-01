import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(form);
      const token = data.accessToken || data.token;

      if (token) {
        // FIXED: Using "accessToken" to match Dashboard.jsx
        localStorage.setItem("accessToken", token);
        localStorage.setItem("token", token);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        alert("Login Successful");
        navigate("/dashboard", { replace: true });
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Login</button>

        <div style={{ margin: "20px 0 12px" }}>
          <p style={{ marginBottom: "8px" }}>Or continue with Google</p>
          {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const data = await googleLogin(credentialResponse.credential);
                  const token = data.accessToken || data.token;

                  if (token) {
                    // FIXED: Using "accessToken" to match Dashboard.jsx
                    localStorage.setItem("accessToken", token);
                    localStorage.setItem("token", token);

                    if (data.user) {
                      localStorage.setItem("user", JSON.stringify(data.user));
                    }

                    alert(data.message || "Google login successful");
                    navigate("/dashboard", { replace: true });
                  } else {
                    alert(data.error || "Google login failed");
                  }
                } catch (error) {
                  console.error(error);
                  alert("Google login failed");
                }
              }}
              onError={() => alert("Google login failed")}
            />
          ) : (
            <p style={{ color: "crimson", marginTop: "8px" }}>
              Google sign-in is not configured yet.
            </p>
          )}
        </div>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
