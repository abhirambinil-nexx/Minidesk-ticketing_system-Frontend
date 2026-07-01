import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicket, updateTicket } from "../api/ticket";

export default function EditTicket() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    status: "open",
  });

  useEffect(() => {
    fetchTicket();
  }, []);

  async function fetchTicket() {
    try {
      const response = await getTicket(id);

      if (response.success) {
        setForm(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await updateTicket(id, form);

      if (response.success) {
        alert("Ticket Updated Successfully");
        navigate("/tickets");
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Edit Ticket</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <br />
        <br />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <br />
        <br />

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>

        <br />
        <br />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
          <option value="reopened">Reopened</option>
        </select>

        <br />
        <br />

        <button type="submit">Update Ticket</button>
      </form>
    </div>
  );
}
