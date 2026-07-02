import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../api/ticket";
import TagSelect from "../components/TagSelect";
import "../style/CreateTicket.css";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    tags: [],
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await createTicket(form);

      if (response.success) {
        alert("Ticket Created Successfully");

        setForm({
          title: "",
          description: "",
          category: "",
          priority: "medium",
          tags: [],
        });

        navigate("/tickets");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating ticket");
    }
  }

  return (
    <div className="create-ticket">
      <h1 className="create-ticket__title">Create Ticket</h1>

      <form className="create-ticket__form" onSubmit={handleSubmit}>
        <div className="create-ticket__field">
          <label className="create-ticket__label">Title</label>
          <br />
          <input
            className="create-ticket__input"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div className="create-ticket__field">
          <label className="create-ticket__label">Description</label>
          <br />
          <textarea
            className="create-ticket__textarea"
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div className="create-ticket__field">
          <label className="create-ticket__label">Category</label>
          <br />
          <input
            className="create-ticket__input"
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <br />

        <div className="create-ticket__field">
          <label className="create-ticket__label">Priority</label>
          <br />
          <select
            className="create-ticket__select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <br />

        <div className="create-ticket__field">
          <label className="create-ticket__label">Tags</label>
          <br />
          <TagSelect
            selected={form.tags}
            onChange={(tags) =>
              setForm({
                ...form,
                tags,
              })
            }
          />
        </div>

        <br />

        <button className="create-ticket__button" type="submit">
          Create Ticket
        </button>
      </form>
    </div>
  );
}
