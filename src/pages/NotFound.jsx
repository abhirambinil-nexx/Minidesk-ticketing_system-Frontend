import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found" style={{ padding: "24px" }}>
      <h1 className="not-found__title">Page Not Found</h1>
      <p className="not-found__message">
        The page you are looking for does not exist.
      </p>
      <Link className="not-found__link" to="/login">
        Go to Login
      </Link>
    </div>
  );
}
