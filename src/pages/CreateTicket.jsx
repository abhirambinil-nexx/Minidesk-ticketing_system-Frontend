import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../api/ticket";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
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
      const response = await createTicket(form);

      if (response.success) {
        alert("Ticket Created Successfully");
        navigate("/tickets");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.log(error.response);
      }

      alert(error.message);
    }
  };

  return (
    <div className="create-ticket">
      <h1>Create Ticket</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Category</label>
          <br />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Priority</label>
          <br />
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <br />

        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
}
