import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import "../style/Login.css";

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
      const response = await login(form);

      console.log("Login Response:", response);

      const data = response.data || response;

      const token = data.accessToken || data.token;
      if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("token", token);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        alert("Login Successful");
        console.log("Navigating to dashboard...");
        console.log("Token:", localStorage.getItem("accessToken"));
        console.log("User:", localStorage.getItem("user"));
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
    <div className="login-page">
      <div className="login-page__card">
        <div className="login-page__left">
          <h1 className="login-page__title">Welcome Back!</h1>

          <p className="login-page__subtitle">
            Enter your credentials to access your account
          </p>

          <form className="login-page__form" onSubmit={handleSubmit}>
            <input
              className="login-page__input"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              className="login-page__input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <button className="login-page__button">Login</button>

            <div className="login-page__social">
              <p
                className="login-page__social-title"
                style={{ marginBottom: "8px" }}
              >
                Or continue with Google
              </p>
              {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
                <div className="login-page__google">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      try {
                        const data = await googleLogin(
                          credentialResponse.credential,
                        );
                        const token = data.accessToken || data.token;

                        if (token) {
                          localStorage.setItem("accessToken", token);
                          localStorage.setItem("token", token);

                          if (data.user) {
                            localStorage.setItem(
                              "user",
                              JSON.stringify(data.user),
                            );
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
                </div>
              ) : (
                <p
                  className="login-page__warning"
                  style={{ color: "crimson", marginTop: "8px" }}
                >
                  Google sign-in is not configured yet.
                </p>
              )}
            </div>

            <p className="login-page__switch-text">
              Don't have an account?
              <Link className="login-page__switch-link" to="/signup">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        <div className="login-page__right"></div>
      </div>
    </div>
  );
}
