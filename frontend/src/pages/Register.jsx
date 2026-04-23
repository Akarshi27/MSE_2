import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const handleSubmit = async () => {
    await API.post("/register", data);
    alert("Registered");
    nav("/login");
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
      Register
    </h2>

    <input
      placeholder="Name"
      onChange={(e) =>
        setData({ ...data, name: e.target.value })
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
      background: "#2196F3",
      border: "none",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer"
    }}>
      Register
    </button>

    {error && (
      <p style={{ color: "#ff4d4d", marginTop: "10px" }}>
        {error}
      </p>
    )}

    <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
      Already have an account?{" "}
      <span
        onClick={() => nav("/login")}
        style={{ color: "#4CAF50", cursor: "pointer" }}
      >
        Login
      </span>
    </p>
  </div>
</div>
  );
}