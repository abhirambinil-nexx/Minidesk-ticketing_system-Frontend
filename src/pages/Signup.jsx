import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import "../style/Signup.css";
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
    <div className="signup-page">
      <div className="signup-page__card">
        <div className="signup-page__left">
          <h1 className="signup-page__title">Get Started Now</h1>

          <p className="signup-page__subtitle">
            Create your account to continue
          </p>

          <form className="signup-page__form" onSubmit={handleSubmit}>
            <label className="signup-page__label">Name</label>
            <input
              className="signup-page__input"
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />

            <label className="signup-page__label">Email Address</label>
            <input
              className="signup-page__input"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />

            <label className="signup-page__label">Password</label>
            <input
              className="signup-page__input"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />

            <button className="signup-page__button" type="submit">
              Sign Up
            </button>

            <div className="signup-page__social">
              <p className="signup-page__social-title">
                Or continue with Google
              </p>

              {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
                <div className="signup-page__google">
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
                </div>
              ) : (
                <p className="signup-page__warning">
                  Google sign-in is not configured yet.
                </p>
              )}
            </div>

            <p className="signup-page__switch-text">
              Already have an account?
              <Link className="signup-page__switch-link" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>

        <div className="signup-page__right"></div>
      </div>
    </div>
  );
}
