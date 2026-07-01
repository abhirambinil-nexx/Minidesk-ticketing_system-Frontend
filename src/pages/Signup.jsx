import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      const data = await signup(form);

      console.log(data);

      const token = data.token || data.accessToken;

      if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("token", token);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        alert(data.message || "Signup Successful");
        navigate("/dashboard", { replace: true });
      } else {
        alert(data.message || "Signup Successful");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button>Signup</button>

        <div style={{ margin: "20px 0 12px" }}>
          <p style={{ marginBottom: "8px" }}>Or continue with Google</p>
          {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const data = await googleLogin(credentialResponse.credential);

                  const token = data.accessToken || data.token;

                  if (token) {
                    localStorage.setItem("accessToken", token);
                    localStorage.setItem("token", token);

                    if (data.user) {
                      localStorage.setItem("user", JSON.stringify(data.user));
                    }

                    alert(data.message || "Google signup successful");
                    navigate("/dashboard", { replace: true });
                  } else {
                    alert(data.error || "Google signup failed");
                  }
                } catch (error) {
                  console.error(error);
                  alert("Google signup failed");
                }
              }}
              onError={() => alert("Google signup failed")}
            />
          ) : (
            <p style={{ color: "crimson", marginTop: "8px" }}>
              Google sign-in is not configured yet.
            </p>
          )}
        </div>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
