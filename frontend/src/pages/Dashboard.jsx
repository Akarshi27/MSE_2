import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [data, setData] = useState([]);
  const nav = useNavigate();

  // ✅ get name
  const name = localStorage.getItem("name");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/grievances");
      setData(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const submit = async () => {
    try {
      await API.post("/grievances", form);

      setForm({
        title: "",
        description: "",
        category: ""
      });

      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  const del = async (id) => {
    await API.delete(`/grievances/${id}`);
    fetchData();
  };

  const update = async (id) => {
    await API.put(`/grievances/${id}`, {
      status: "Resolved"
    });
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name"); // ✅ remove name
    nav("/login");
  };

  return (
    <div style={{
  maxWidth: "750px",
  margin: "40px auto",
  padding: "25px",
  background: "#1e1e2f",
  borderRadius: "12px",
  color: "white",
  fontFamily: "Segoe UI"
}}>

  <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
    Welcome, {name}
  </h2>

  <div style={{ textAlign: "right" }}>
    <button onClick={logout} style={{
      background: "#ff4d4d",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer"
    }}>
      Logout
    </button>
  </div>

  <hr style={{ margin: "20px 0", opacity: 0.3 }} />

  <h3>Submit Grievance</h3>

  <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
    <input
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none" }}
    />

    <input
      placeholder="Description"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
      style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none" }}
    />

    <select
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
      style={{ padding: "8px", borderRadius: "6px" }}
    >
      <option value="">Category</option>
      <option value="Academic">Academic</option>
      <option value="Hostel">Hostel</option>
      <option value="Transport">Transport</option>
      <option value="Other">Other</option>
    </select>

    <button onClick={submit} style={{
      background: "#4CAF50",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer"
    }}>
      Submit
    </button>
  </div>

  <hr style={{ margin: "20px 0", opacity: 0.3 }} />

  <h3>All Grievances</h3>

  {data.length === 0 ? (
    <p style={{ opacity: 0.6 }}>No grievances yet</p>
  ) : (
    data.map((g) => (
      <div key={g._id} style={{
        background: "#2a2a40",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px"
      }}>
        <b>{g.title}</b> 
        <span style={{ opacity: 0.7 }}> ({g.category})</span>
        <span style={{
          float: "right",
          color: g.status === "Resolved" ? "#4CAF50" : "#ffa500"
        }}>
          {g.status}
        </span>

        <p style={{ marginTop: "5px" }}>{g.description}</p>

        <button onClick={() => update(g._id)} style={{
          marginRight: "10px",
          background: "#2196F3",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          color: "white"
        }}>
          Resolve
        </button>

        <button onClick={() => del(g._id)} style={{
          background: "#ff4d4d",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          color: "white"
        }}>
          Delete
        </button>
      </div>
    ))
  )}
</div>
  );
}