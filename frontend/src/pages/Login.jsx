import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const nav = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setShowRegister(false);

    try {
      const res = await API.post("/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name); // ✅ store name

      nav("/dashboard");

    } catch (err) {
      const msg = err.response?.data?.msg || "Login failed";
      setError(msg);

      if (
        msg.toLowerCase().includes("not registered") ||
        msg.toLowerCase().includes("invalid email")
      ) {
        setShowRegister(true);
      }
    }
  };

  return (
    <div style={{
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#12121a",
  fontFamily: "Segoe UI"
}}>
  <div style={{
    background: "#1e1e2f",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    color: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)"
  }}>
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
      Login
    </h2>

    <input
      placeholder="Email"
      onChange={(e) =>
        setData({ ...data, email: e.target.value })
      }
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
        border: "none"
      }}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setData({ ...data, password: e.target.value })
      }
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "6px",
        border: "none"
      }}
    />

    <button onClick={handleSubmit} style={{
      width: "100%",
      padding: "10px",
      background: "#4CAF50",
      border: "none",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer"
    }}>
      Login
    </button>

    {error && (
      <p style={{ color: "#ff4d4d", marginTop: "10px" }}>
        {error}
      </p>
    )}

    <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
      New user?{" "}
      <span
        onClick={() => nav("/")}
        style={{ color: "#4CAF50", cursor: "pointer" }}
      >
        Register
      </span>
    </p>
  </div>
</div>
  );
}